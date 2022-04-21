import { StoreonModule } from 'storeon';
import { WButton } from 'padme-wasm';

import keyCodes from './keycodes';

interface State {
    settings: {
        scale: number;
        styleName: string;
        keys: {
            [name: number]: number;
        };
        maxFps: number;
    }
}

interface Events {
    'settings/key/update': {
        name: WButton;
        code: number;
    };
    'settings/scale/update': number;
    'settings/style/update': string;
    'settings/max-fps/update': number;
}

const initialState = {
    scale: 1.2,
    styleName: 'classic',
    keys: {
        [WButton.Up]: keyCodes['⬆'],
        [WButton.Down]: keyCodes['⬇'],
        [WButton.Left]: keyCodes['⬅'],
        [WButton.Right]: keyCodes['➡'],
        [WButton.A]: keyCodes.A,
        [WButton.B]: keyCodes.S,
        [WButton.Select]: keyCodes.ALT,
        [WButton.Start]: keyCodes.ENTER,
    },
    maxFps: 60,
};

const storeHandler: StoreonModule<State, Events> = (store) => {
    store.on('@init', () => ({
        settings: initialState
    }));

    store.on('settings/scale/update', ({ settings }, scale) => (
        { settings: { ...settings, scale } }
    ));

    store.on('settings/key/update', ({ settings }, key) => (
        { settings: { ...settings, keys: { ...settings.keys, [key.name]: key.code } } }
    ));

    store.on('settings/style/update', ({ settings }, styleName) => (
        { settings: { ...settings, styleName } }
    ));

    store.on('settings/max-fps/update', ({ settings }, maxFps) => (
        { settings: { ...settings, maxFps } }
    ));
};

export { State as SettingsState };
export { Events as SettingsEvents };
export default storeHandler;
