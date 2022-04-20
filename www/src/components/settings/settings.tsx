import { WButton } from 'padme-wasm';
import { FunctionalComponent, h } from 'preact';
import { useStoreon } from 'storeon/preact';

import { InputKey } from './input-key';
import { Modal, type ModalProps } from '../modal';
import { isMobile } from '../../utils';

import style from './settings.scss';

type Props = {
    isOpen: ModalProps['isOpen'];
    onClose: ModalProps['onClose'];
}

const Settings: FunctionalComponent<Props> = ({ isOpen, onClose }) => {
    const { dispatch, scale, styleName, keys, maxFps } = useStoreon('scale', 'styleName', 'keys', 'maxFps');

    return (
        <Modal title={'Settings'} isOpen={isOpen} onClose={onClose}>
            <div class={style.container}>
            <div class="row">
                <div class="four columns">
                    <label for="scale-input">Scale</label>
                    <input type="range" onInput={(e) => {
                        e.target && dispatch('game/scale/update', (e.target as HTMLInputElement).value)
                    }} step={0.1} min={1} max={3} id="scale-input" value={scale} />
                </div>
                <div class="four columns">
                    <label for="style-input">Style</label>
                    <select id="style-input" value={styleName} onChange={(e) => {
                       e.target && dispatch('game/style/update', (e.target as HTMLSelectElement).value)
                    }}>
                        <option value="nostyle">No style</option>
                        <option value="classic">Retro</option>
                    </select>
                </div>
                <div class="four columns">
                    <label for="max-fps-input">Max FPS</label>
                    <input id="max-fps-input" type="number" onInput={(e) => {
                        e.target && dispatch('game/max-fps/update', (e.target as HTMLInputElement).value)
                    }} step={1} min={1} max={200} value={maxFps} />
                </div>
            </div>
            <div class={style.separator}/>
            <table class={style.keymap} style={{ display: isMobile() ? 'none' : 'block' }}>
                <tr>
                <td>
                    <label class={style.controldir} for="up-input">
                        <div class={`${style.pointer} ${style.up}`}/>
                   </label>
                </td>
                <td class={style.input}>
                    <InputKey code={keys[WButton.Up]}
                              onKey={(code) => dispatch('game/key/update', { name: WButton.Up, code })} />
                </td>
                <td>
                    <label class={style.controldir} for="left-input">
                        <div class={`${style.pointer} ${style.left}`}/>
                    </label>
                </td>
                <td class={style.input}>
                    <InputKey code={keys[WButton.Left]}
                              onKey={(code) => dispatch('game/key/update', { name: WButton.Left, code })} />
                </td>
                <td>
                    <label class={style.controldir} for="right-input">
                        <div class={`${style.pointer} ${style.right}`}/>
                    </label>
                </td>
                <td class={style.input}>
                    <InputKey code={keys[WButton.Right]}
                              onKey={(code) => dispatch('game/key/update', { name: WButton.Right, code })} />
                </td>
                <td>
                    <label class={style.controldir} for="down-input">
                        <div class={`${style.pointer} ${style.down}`}/>
                    </label>
                </td>
                <td class={style.input}>
                    <InputKey code={keys[WButton.Down]}
                              onKey={(code) => dispatch('game/key/update', { name: WButton.Down, code })} />
                </td>
            </tr>
            <tr>
                <td>
                    <label class={style.controlaction} for="a-input">A</label>
                </td>
                <td class={style.input}>
                    <InputKey code={keys[WButton.A]}
                              onKey={(code) => dispatch('game/key/update', { name: WButton.A, code })} />
                </td>
                <td>
                    <label class={style.controlaction} for="b-input">B</label>
                </td>
                <td class={style.input}>
                    <InputKey code={keys[WButton.B]}
                              onKey={(code) => dispatch('game/key/update', { name: WButton.B, code })} />
                </td>
                <td>
                    <label class={style.controls} for="select-input">SELECT</label>
                </td>
                <td class={style.input}>
                    <InputKey code={keys[WButton.Select]}
                              onKey={(code) => dispatch('game/key/update', { name: WButton.Select, code })} />
                </td>
                <td>
                    <label class={style.controls} for="start-input">START</label>
                </td>
                <td class={style.input}>
                    <InputKey code={keys[WButton.Select]}
                              onKey={(code) => dispatch('game/key/update', { name: WButton.Start, code })} />
                </td>
           </tr>
        </table>
        </div>
        </Modal>
    );
}

export { Settings };
