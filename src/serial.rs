use padme_core::SerialOutput;
use wasm_bindgen::prelude::*;

pub struct SerialConsole {
    on_data_handler: js_sys::Function,
}

impl SerialConsole {
    pub fn new(on_data_handler: js_sys::Function) -> Self {
        Self { on_data_handler }
    }
}

impl SerialOutput for SerialConsole {
    fn putchar(&mut self, c: u8) {
        self.on_data_handler
            .call1(&JsValue::null(), &JsValue::from(c))
            .ok();
    }
}
