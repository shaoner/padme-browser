import { FunctionalComponent, h } from 'preact';
import { useStoreon } from 'storeon/preact';

import { Modal, type ModalProps } from '@app/components/modal';
import { isMobile } from '@/utils';
import { KeyMap } from './keymap';

type Props = {
    isOpen: ModalProps['isOpen'];
    onClose: ModalProps['onClose'];
}

const Settings: FunctionalComponent<Props> = ({ isOpen, onClose }) => {
    const { dispatch, settings } = useStoreon('settings');

    const footer = (
        <button class="button"
                onClick={() => dispatch('settings/reset')}>
            Reset to default
        </button>
    );

    return (
        <Modal title={'Settings'} isOpen={isOpen} onClose={onClose} footer={footer}>
            <div>
                <div class="columns">
                    <div class="column is-two-thirds">
                        <div class="field is-horizontal">
                            <div class="field-label">
                                <label class="label">Scale</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <input type="range" onInput={(e) => {
                                            e.target && dispatch('settings/scale/update', (e.target as HTMLInputElement).value)
                                        }} step={0.1} min={1} max={3} id="scale-input" value={settings.scale} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label">
                                <label class="label">Style</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <div class="select">
                                            <select id="style-input" value={settings.styleName} onChange={(e) => {
                                                e.target && dispatch('settings/style/update', (e.target as HTMLSelectElement).value)
                                            }}>
                                                <option value="nostyle">No style</option>
                                                <option value="classic">Retro</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label">
                                <label class="label">Max FPS</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <input class="input" id="max-fps-input" type="number" onInput={(e) => {
                                            e.target && dispatch('settings/max-fps/update', (e.target as HTMLInputElement).value)
                                        }} step={1} min={1} max={200} value={settings.maxFps} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label">
                                <label class="label">Serial port</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <input type="checkbox" checked={settings.serialEnabled} onInput={(e) => {
                                            e.target && dispatch('settings/serial/update', (e.target as HTMLInputElement).checked)
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {!isMobile() ? (
                    <KeyMap />
                ) : null}
            </div>
        </Modal>
    );
}

export { Settings };
