import { StoreonModule } from 'storeon';

interface State {
    serial: {
        text: string;
    }
}

interface Events {
    'serial/putchar': string;
    'serial/clear': void;
}

const initialState = {
    text: '',
};

const setupListeners: StoreonModule<State, Events> = (store) => {
    store.on('@init', () => ({
        serial: initialState,
    }));

    store.on('serial/putchar', ({ serial: { text } }, c: string) => ({
        serial: { text: text + c }
    }));

    store.on('serial/clear', () => ({
        serial: initialState,
    }));
};

export { State as SerialState };
export { Events as SerialEvents };
export default setupListeners;
