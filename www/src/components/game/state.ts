import { StoreonModule } from 'storeon';
import { WButton } from 'padme-wasm';

import keyCodes from './keycodes';

interface State {
    scale: number;
    styleName: string;
    keys: {
        [name: number]: number;
    };
    maxFps: number;
}

interface Events {
    'game/key/update': {
        name: WButton;
        code: number;
    };
    'game/scale/update': number;
    'game/style/update': string;
    'game/max-fps/update': number;
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

const reducer: StoreonModule<State, Events> = (store) => {
    store.on('@init', () => initialState);

    store.on('game/scale/update', (state, scale) => (
        { ...state, scale }
    ));

    store.on('game/key/update', (state, key) => (
        { ...state, keys: { ...state.keys, [key.name]: key.code } }
    ));

    store.on('game/style/update', (state, styleName) => (
        { ...state, styleName }
    ));

    store.on('game/max-fps/update', (state, maxFps) => (
        { ...state, maxFps }
    ));
};

export { State as GameState };
export { Events as GameEvents };
export default reducer;
