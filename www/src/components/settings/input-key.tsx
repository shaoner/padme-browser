import { FunctionalComponent, h } from 'preact';
import { useRef } from 'preact/hooks';

import keyCodes from './keycodes';

import style from './input-key.scss';

type Props = {
    onKey: (keyCode: number) => void;
    code: number;
};

const InputKey: FunctionalComponent<Props> = ({ onKey, code }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const onKeyDown = (event: KeyboardEvent) => {
        if (event) {
            event.preventDefault();
            onKey(event.keyCode);
        }
        stopListening();
    };
    const stopListening = () => {
        inputRef?.current?.removeEventListener('keydown', onKeyDown);
        inputRef?.current?.blur();
    };
    const startListening = () => {
        inputRef?.current?.addEventListener('keydown', onKeyDown);
    };
    return (
        <input ref={inputRef}
               class={style.key}
               readonly={true}
               type={'text'}
               value={keyCodes[code]}
               onFocus={startListening}
               onBlur={stopListening} />
    );
};

export { InputKey };
