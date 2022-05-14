use std::cmp;
use std::sync::{Arc, Mutex};

use cpal::traits::{DeviceTrait, HostTrait, StreamTrait};
use cpal;
use log::error;
use padme_core::{AUDIO_SAMPLE_RATE, AudioSpeaker};

fn play_frame<T: cpal::Sample>(outbuffer: &mut[T], sample_buf: &Arc<Mutex<Vec<f32>>>) {
    let mut sample_buf = sample_buf.lock().unwrap();
    let min_len = cmp::min(outbuffer.len(), sample_buf.len());

    for (i, s) in sample_buf.drain(..min_len).enumerate() {
        outbuffer[i] = cpal::Sample::from(&s);
    }
}

fn create_stream(sample_buf: &Arc<Mutex<Vec<f32>>>) -> Result<cpal::Stream, AudioError>  {
    let host = cpal::default_host();
    let device = host.default_output_device().ok_or(AudioError::DeviceUnavailable)?;
    let sample_rate = cpal::SampleRate(AUDIO_SAMPLE_RATE);
    let mut supported_configs = device.supported_output_configs()?;
    // Find a config that supports:
    // - stereo
    // - float 32
    // - sample rate = 48kHz
    let supported_config = supported_configs.find(| cnf | cnf.channels() == 2
                                                  && sample_rate >= cnf.min_sample_rate()
                                                  && sample_rate <= cnf.max_sample_rate()
                                                  && cnf.sample_format() == cpal::SampleFormat::F32).unwrap();
    let supported_config = supported_config.with_sample_rate(sample_rate);
    let sample_buf = sample_buf.clone();
    let stream = device.build_output_stream(
        &supported_config.config(),
        move |data: &mut [f32], _: &cpal::OutputCallbackInfo| play_frame(data, &sample_buf),
        |err| error!("error while playing audio: {}", err),
    ).unwrap();

    stream.play().unwrap();

    Ok(stream)
}

enum AudioError {
    DeviceUnavailable,
    StreamConfig(cpal::SupportedStreamConfigsError),
}

impl From<cpal::SupportedStreamConfigsError> for AudioError {
    fn from(error: cpal::SupportedStreamConfigsError) -> Self {
        AudioError::StreamConfig(error)
    }
}

pub struct AudioPlayer {
    /// Store all samples
    sample_buf: Arc<Mutex<Vec<f32>>>,
    /// Keep the stream player alive
    stream: Option<cpal::Stream>,
    /// Status paused or running
    paused: bool,
    /// Volume from 0.0 to 1.0
    volume: f32,
}

impl AudioPlayer {
    pub fn new() -> Self {
        let sample_buf = Arc::new(Mutex::new(Vec::new()));
        let stream = create_stream(&sample_buf).ok();
        let paused = stream.is_none();

        Self {
            sample_buf,
            stream,
            paused,
            volume: 0.5,
        }
    }

    pub fn pause(&mut self) {
        self.paused = true;
        // this forces the stream to drop and stop playing
        self.stream = None;
    }

    pub fn play(&mut self) {
        self.stream = create_stream(&self.sample_buf).ok();
        self.paused = false;
    }

    pub fn set_volume(&mut self, volume: f32) {
        self.volume = match volume {
            n if n < 0.0 => 0.0,
            n if n > 1.0 => 1.0,
            _ => volume,
        }
    }
}

impl AudioSpeaker for AudioPlayer {
    fn set_samples(&mut self, left: f32, right: f32) {
        let mut sample_buf = self.sample_buf.lock().unwrap();
        let max_len = ((AUDIO_SAMPLE_RATE * 300) / 1000) as usize;
        // stop if the buffer has more than 300ms of samples
        if !self.paused && sample_buf.len() < max_len {
            sample_buf.push(left * self.volume);
            sample_buf.push(right * self.volume);
        }
    }
}
