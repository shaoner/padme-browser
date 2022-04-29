import { Component, h, createRef } from 'preact';
import { memory } from 'padme-wasm/padme_wasm_bg.wasm';
import { connectStoreon } from 'storeon/preact';

import { Scalable, ScalableProps } from '@app/components/scalable';
import { SettingsState } from '@app/settings/settings.state';

import style from './screen.scss';

export const SCREEN_WIDTH = 160;
export const SCREEN_HEIGHT = 144;

type Props = {
    settings: SettingsState['settings'];
} & ScalableProps;

class ScreenComponent extends Component<Props> {
    private _canvasRef = createRef();
    private _img?: ImageData;

    render() {
        const { settings: { styleName } } = this.props;
        return (
            <Scalable className={style.container} {...this.props}>
                <canvas ref={this._canvasRef} width={this.props.width} height={this.props.height} />
                <div class={style.overlay + ' ' + style[styleName]}/>
            </Scalable>
        );
    }

    public setFramebuffer(bufferPtr: number): void {
        const fb = new Uint8ClampedArray(memory.buffer, bufferPtr,
                                         SCREEN_WIDTH * SCREEN_HEIGHT * 4);
        this._img = new ImageData(fb, SCREEN_WIDTH, SCREEN_HEIGHT);
    }

    public updateImage(): void {
        if (this._img) {
            const ctx = this._canvasRef.current.getContext('2d');
            if (ctx) {
                ctx.putImageData(this._img, 0, 0);
            }
        }
    }

    public clear(): void {
        const canvas = this._canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
}

export const Screen = connectStoreon('settings', ScreenComponent);
