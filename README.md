# Padme browser

@ https://padme.cc

This is a WebAssembly version of a GB emulator [padme-core](https://github.com/alexlren/padme-core).

## Demo

<img src="/docs/demo.gif" width="300"/>

## Architecture

* `core`: [padme-core](https://github.com/alexlren/padme-core) submodule. This is the heart of the emulator, usually up-to-date.
* `src`: WebAssembly implementation of the core, it exposes a framebuffer and simple methods to javascript
* `www`: The Preact web app that embeds the wasm library and deal with everything UI-related
