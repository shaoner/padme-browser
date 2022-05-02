import { WButton } from 'padme-wasm';
import { FunctionalComponent, h } from 'preact';
import { useStoreon } from 'storeon/preact';

import { InputKey } from '@app/components/input-key';

import style from './keymap.scss';

const KeyMap: FunctionalComponent = () => {
    const { dispatch, settings } = useStoreon('settings');

    return (
        <table class={`${style.keymap} is-size-6`}>
            <tr>
                <td>
                    <label class={style.controldir} for="up-input">
                        <div class={`${style.pointer} ${style.up}`}/>
                    </label>
                </td>
                <td class={style.input}>
                    <InputKey code={settings.keys[WButton.Up]}
                              onKey={(code) => dispatch('settings/key/update', { name: WButton.Up, code })} />
                </td>
                <td>
                    <label class={style.controldir} for="left-input">
                        <div class={`${style.pointer} ${style.left}`}/>
                    </label>
                </td>
                <td class={style.input}>
                    <InputKey code={settings.keys[WButton.Left]}
                              onKey={(code) => dispatch('settings/key/update', { name: WButton.Left, code })} />
                </td>
                <td>
                    <label class={style.controldir} for="right-input">
                        <div class={`${style.pointer} ${style.right}`}/>
                    </label>
                </td>
                <td class={style.input}>
                    <InputKey code={settings.keys[WButton.Right]}
                              onKey={(code) => dispatch('settings/key/update', { name: WButton.Right, code })} />
                </td>
                <td>
                    <label class={style.controldir} for="down-input">
                        <div class={`${style.pointer} ${style.down}`}/>
                    </label>
                </td>
                <td class={style.input}>
                    <InputKey code={settings.keys[WButton.Down]}
                              onKey={(code) => dispatch('settings/key/update', { name: WButton.Down, code })} />
                </td>
            </tr>
            <tr>
                <td>
                    <label class={style.controlaction} for="a-input">A</label>
                </td>
                <td class={style.input}>
                    <InputKey code={settings.keys[WButton.A]}
                              onKey={(code) => dispatch('settings/key/update', { name: WButton.A, code })} />
                </td>
                <td>
                    <label class={style.controlaction} for="b-input">B</label>
                </td>
                <td class={style.input}>
                    <InputKey code={settings.keys[WButton.B]}
                              onKey={(code) => dispatch('settings/key/update', { name: WButton.B, code })} />
                </td>
                <td>
                    <label class={style.controls} for="select-input">SELECT</label>
                </td>
                <td class={style.input}>
                    <InputKey code={settings.keys[WButton.Select]}
                              onKey={(code) => dispatch('settings/key/update', { name: WButton.Select, code })} />
                </td>
                <td>
                    <label class={style.controls} for="start-input">START</label>
                </td>
                <td class={style.input}>
                    <InputKey code={settings.keys[WButton.Start]}
                              onKey={(code) => dispatch('settings/key/update', { name: WButton.Start, code })} />
                </td>
            </tr>
        </table>
    );
};

export { KeyMap };
