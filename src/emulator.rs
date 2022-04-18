use wasm_bindgen::prelude::*;
use padme_core::{Button, Rom, System};

use crate::{Lcd, SerialConsole};

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
    sys: System<Vec<u8>, Lcd, SerialConsole>
}

#[wasm_bindgen]
impl Emulator {
    pub fn new(bin: Vec<u8>, on_serial_handler: js_sys::Function) -> Result<Emulator, JsValue> {
        let rom = Rom::load(bin).map_err(| _ | { JsValue::from(format!("Invalid rom")) })?;

        Ok(Emulator {
             sys: System::new(
                rom,
                Lcd::new(),
                SerialConsole::new(on_serial_handler),
            ),
        })
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
}
