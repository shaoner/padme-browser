import { FunctionalComponent, h } from 'preact';

import { Modal, type ModalProps } from '../modal';

import style from './help.scss';

type Props = {
    isOpen: ModalProps['isOpen'];
    onClose: ModalProps['onClose'];
}

const Help: FunctionalComponent<Props> = ({ isOpen, onClose }) => {
    return (
        <Modal title={'Help center'} isOpen={isOpen} onClose={onClose}>
            <div class={style.container}>
                <h6>How to find games?</h6>
                <p>While I can't advertise games here, it's actually pretty easy to find them.</p>
                <p>You could just type something close to <code>gameboy rom tetris</code> on any search engine.</p>
                <h6>I found a bug</h6>
                <p>Please send me an email at alexlt@pm.me</p>
                <h6>How is this emulator made?</h6>
                <p>First, there is a <a href="https://github.com/alexlren/padme-core">core</a> made using the Rust programming language. It's platform-agnostic but it provides the tools to create an emulator depending on your platform.</p>
                <p>Then, there is a <a href="https://github.com/alexlren/padme-browser/tree/main/src">WebAssembly wrapper</a>, that uses the core but implements a real screen and a simple interface to be used by the last piece.</p>
                <p>Finally, there is a <a href="https://github.com/alexlren/padme-browser/tree/main/www">web app</a>, that embeds the webassembly library as the emulator and deals with everything UI-related.</p>
            </div>
        </Modal>
    );
};

export { Help };
