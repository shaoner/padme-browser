use padme_core::{Pixel, Screen, FRAME_WIDTH, FRAME_HEIGHT};

pub struct Lcd {
    framebuffer: [u8; FRAME_WIDTH * FRAME_HEIGHT * 4],
}

impl Lcd {
    pub const fn new() -> Self {
        Self { framebuffer: [0x00u8; FRAME_WIDTH * FRAME_HEIGHT * 4] }
    }

    pub fn framebuffer(&self) -> *const u8 {
        &self.framebuffer as *const u8
    }

}

impl Screen for Lcd {
    fn set_pixel(&mut self, px: &Pixel, x: u8, y: u8) {
        let i = (x as usize + y as usize * FRAME_WIDTH) * 4;
        self.framebuffer[i] = px.r;
        self.framebuffer[i + 1] = px.g;
        self.framebuffer[i + 2] = px.b;
        self.framebuffer[i + 3] = px.a;
    }

    fn update(&mut self) {
    }
}
