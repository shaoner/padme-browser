import { FunctionalComponent, h } from 'preact';

import { Modal, type ModalProps } from '@app/components/modal';
import { KeyMap } from '../settings/keymap';
import { isMobile } from '@/utils';

type Props = {
    isOpen: ModalProps['isOpen'];
    onClose: ModalProps['onClose'];
}

const Help: FunctionalComponent<Props> = ({ isOpen, onClose }) => {
    return (
        <Modal title={'Help center'} isOpen={isOpen} onClose={onClose}>
            <div>
                <section class="section">
                    <h6 class="title is-5">How to play?</h6>
                    <p class="is-size-6 pb-2">1. Select a game. You can find games online, usually typing <code>gameboy rom tetris</code> on any search engine works.</p>
                    {isMobile() ? (
                       <p class="is-size-6">2. Each control is touchable</p>
                    ) : (
                        <p class="is-size-6">2. Use the following keyboard mapping:
                            <KeyMap />
                        </p>
                    )}
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
