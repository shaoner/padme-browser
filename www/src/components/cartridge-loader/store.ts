import { StoreonModule } from 'storeon';
import { Cartridge } from 'padme-wasm';

interface State {
    cartridge: {
        loaded: boolean;
        title: string;
        type: string;
        licensee: string;
        romSize: number;
        ramSize: number;
        colorMode: string;
        isJp: boolean;
        version: number;
        checksum: boolean;
    }
}

interface Events {
    'cartridge/load': Cartridge;
    'cartridge/unload': void;
}

const initialState = {
    loaded: false,
    title: '',
    type: '',
    licensee: '',
    romSize: 0,
    ramSize: 0,
    colorMode: '',
    isJp: false,
    version: 0,
    checksum: false,
};

const reducer: StoreonModule<State, Events> = (store) => {
    store.on('@init', () => ({
        cartridge: initialState
    }));

    store.on('cartridge/load', (_, cartridge) => (
        {
            cartridge: {
                loaded: true,
                title: cartridge.title(),
                type: cartridge.cartridge_type(),
                licensee: cartridge.licensee(),
                romSize: cartridge.rom_size(),
                ramSize: cartridge.ram_size(),
                colorMode: cartridge.cgb_mode(),
                isJp: cartridge.is_jp(),
                version: cartridge.version(),
                checksum: cartridge.checksum(),
            },
        }
    ));

    store.on('cartridge/unload', () => (
        { cartridge: { ...initialState } }
    ));
};

export { State as CartridgeState };
export { Events as CartridgeEvents };
export default reducer;
