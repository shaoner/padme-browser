use wasm_bindgen::prelude::*;
use padme_core::Rom;

#[wasm_bindgen]
pub struct Cartridge {
    rom: Rom<Vec<u8>>
}

impl Cartridge {
    pub fn rom(self) -> Rom<Vec<u8>> {
        self.rom
    }
}

#[wasm_bindgen]
impl Cartridge {
    pub fn new(bin: Vec<u8>) -> Result<Cartridge, JsValue> {
        let rom = Rom::load(bin).map_err(| _ | { JsValue::from(format!("Invalid rom")) })?;

        Ok(Cartridge { rom })
    }

    pub fn title(&self) -> JsValue {
        let title = self.rom.title().unwrap_or("");
        JsValue::from(title)
    }

    pub fn cartridge_type(&self) -> JsValue {
        JsValue::from(format!("{:?}", self.rom.cartridge_type()))
    }

    pub fn licensee(&self) -> JsValue {
        JsValue::from(format!("{:?}", self.rom.licensee()))
    }

    pub fn cgb_mode(&self) -> JsValue {
        JsValue::from(format!("{:?}", self.rom.cgb_mode()))
    }

    pub fn is_sgb(&self) -> JsValue {
        JsValue::from(self.rom.is_sgb())
    }

    pub fn is_jp(&self) -> JsValue {
        JsValue::from(self.rom.is_jp())
    }

    pub fn rom_size(&self) -> JsValue {
        JsValue::from(self.rom.size())
    }

    pub fn ram_size(&self) -> JsValue {
        JsValue::from(self.rom.ram_size())
    }

    pub fn version(&self) -> JsValue {
        JsValue::from(self.rom.version())
    }

    pub fn checksum(&self) -> JsValue {
        JsValue::from(self.rom.verify_header_checksum())
    }
}
