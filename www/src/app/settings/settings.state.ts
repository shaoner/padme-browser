import { StoreonModule } from 'storeon';
import { WButton } from 'padme-wasm';

import { keyCodes } from '@/utils';

interface State {
    settings: {
        scale: number;
        styleName: string;
        keys: {
            [name: number]: number;
        };
        maxFps: number;
        serialEnabled: boolean;
        audioEnabled: boolean;
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
    'settings/serial/update': boolean;
    'settings/audio-enabled/update': boolean;
    'settings/reset': void;
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
    serialEnabled: false,
    audioEnabled: true,
};

const setupListeners: StoreonModule<State, Events> = (store) => {
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

    store.on('settings/serial/update', ({ settings }, serialEnabled) => (
        { settings: { ...settings, serialEnabled } }
    ))

    store.on('settings/audio-enabled/update', ({ settings }, audioEnabled) => (
        { settings: { ...settings, audioEnabled } }
    ))

    store.on('settings/reset', () => ({
        settings: initialState
    }));
};

export { State as SettingsState };
export { Events as SettingsEvents };
export default setupListeners;
