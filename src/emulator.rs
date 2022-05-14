use padme_core::{Button, System};
use wasm_bindgen::prelude::*;

use crate::{AudioPlayer, Cartridge, Lcd, SerialConsole};

#[wasm_bindgen]
pub enum WButton {
    A,
    B,
    Select,
    Start,
    Up,
    Down,
    Left,
    Right,
}

#[wasm_bindgen]
pub struct Emulator {
    sys: System<Vec<u8>, Lcd, SerialConsole, AudioPlayer>,
}

#[wasm_bindgen]
impl Emulator {
    pub fn new(cartridge: Cartridge,
               on_serial_handler: js_sys::Function) -> Self {
        Emulator {
            sys: System::new(
                cartridge.rom(),
                Lcd::new(),
                SerialConsole::new(on_serial_handler),
                AudioPlayer::new(),
            ),
        }
    }

    pub fn load_cartridge(&mut self, cartridge: Cartridge) {
        self.sys.load_rom(cartridge.rom())
    }

    pub fn load_bin(&mut self, bin: Vec<u8>) -> Result<(), JsValue> {
        self.sys
            .load_bin(bin)
            .map_err(|_| JsValue::from("Invalid rom".to_string()))?;
        Ok(())
    }

    pub fn update(&mut self) -> u32 {
        self.sys.update_frame()
    }

    // in ms
    pub fn min_frame_time(&self) -> u32 {
        self.sys.min_frame_time().as_millis() as u32
    }

    pub fn framebuffer(&mut self) -> *const u8 {
        self.sys.screen().framebuffer()
    }

    pub fn reset(&mut self) {
        self.sys.screen().clear();
        self.sys.reset();
    }

    pub fn set_button(&mut self, button: WButton, is_pressed: bool) {
        match button {
            WButton::A => self.sys.set_button(Button::A, is_pressed),
            WButton::B => self.sys.set_button(Button::B, is_pressed),
            WButton::Select => self.sys.set_button(Button::Select, is_pressed),
            WButton::Start => self.sys.set_button(Button::Start, is_pressed),
            WButton::Up => self.sys.set_button(Button::Up, is_pressed),
            WButton::Down => self.sys.set_button(Button::Down, is_pressed),
            WButton::Left => self.sys.set_button(Button::Left, is_pressed),
            WButton::Right => self.sys.set_button(Button::Right, is_pressed),
        }
    }

    pub fn enable_audio(&mut self, enable: bool) {
        if enable {
            self.sys.speaker().play();
        } else {
            self.sys.speaker().pause();
        }
    }

}
