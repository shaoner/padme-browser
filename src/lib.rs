use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

mod audio;
mod cartridge;
mod emulator;
mod lcd;
mod serial;

pub use audio::AudioPlayer;
pub use cartridge::Cartridge;
pub use emulator::{Emulator, WButton};
pub use lcd::Lcd;
pub use serial::SerialConsole;

#[wasm_bindgen]
pub fn main() {
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();

    #[cfg(feature = "console_log")]
    #[cfg(debug_assertions)]
    {
        use log::Level;
        console_log::init_with_level(Level::Debug).expect("error initializing log");
    }
}
