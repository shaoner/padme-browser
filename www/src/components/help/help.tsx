import { FunctionalComponent, h } from 'preact';

import { Modal, type ModalProps } from '../modal';

type Props = {
    isOpen: ModalProps['isOpen'];
    onClose: ModalProps['onClose'];
}

const Help: FunctionalComponent<Props> = ({ isOpen, onClose }) => {
    return (
        <Modal title={'Help center'} isOpen={isOpen} onClose={onClose}>
            <div>
                <section class="section">
                    <h6 class="title is-5">How to find games?</h6>
                    <p class="is-size-6">While I can't advertise games here, it's actually pretty easy to find them.</p>
                    <p class="is-size-6">You could just type something close to <code>gameboy rom tetris</code> on any search engine.</p>
                </section>
                <section class="section">
                    <h6 class="title is-5">I found a bug</h6>
                    <p class="is-size-6">Please send me an email at alexlt@pm.me</p>
                </section>
                <section class="section">
                    <h6 class="title is-5">How is this emulator made?</h6>
                    <p class="is-size-6">First, there is a <a href="https://github.com/alexlren/padme-core">core</a> made using the Rust programming language. It's platform-agnostic but it provides the tools to create an emulator depending on your platform.</p>
                    <p class="is-size-6">Then, there is a <a href="https://github.com/alexlren/padme-browser/tree/main/src">WebAssembly wrapper</a>, that uses the core but implements a real screen and a simple interface to be used by the last piece.</p>
                    <p class="is-size-6">Finally, there is a <a href="https://github.com/alexlren/padme-browser/tree/main/www">web app</a>, that embeds the webassembly library as the emulator and deals with everything UI-related.</p>
                </section>
            </div>
        </Modal>
    );
};

export { Help };
