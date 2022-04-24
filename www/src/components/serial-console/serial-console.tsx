import { FunctionalComponent, h } from 'preact';
import { useRef } from 'preact/hooks';
import { useStoreon } from 'storeon/preact';

import style from './serial-console.scss';

const SerialConsole: FunctionalComponent = () => {
    const textRef = useRef(null);
    const { serial: { text }, settings: { serialEnabled } } = useStoreon('serial', 'settings');


    if (textRef.current) {
        (textRef.current as HTMLTextAreaElement).value = text;
    }

    if (!serialEnabled) {
        return null;
    }
    return (
        <article class="message">
            <div class="message-header">
                Serial
            </div>
            <div class="message-body">
                <textarea class={`textarea is-small ${style.textarea}`} ref={textRef} readonly />
            </div>
        </article>
    );
}

export { SerialConsole };
