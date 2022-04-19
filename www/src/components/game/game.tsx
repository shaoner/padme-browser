import { Emulator, WButton } from 'padme-wasm';
import { Component, createRef, h } from 'preact';
import { connectStoreon } from 'storeon/preact';

import { CartridgeLoader } from '../cartridge-loader';
import {
    CTRL_ACTION_HEIGHT,
    CTRL_ACTION_WIDTH,
    CTRL_DIR_HEIGHT,
    CTRL_DIR_WIDTH,
    CTRL_S_HEIGHT,
    CTRL_S_WIDTH,
    ControlAction,
    ControlDir,
    ControlS,
} from '../controls';
import { Fps } from '../fps';
import { GameSection } from '../game-section';
import { Screen } from '../screen';
import { GameState } from './state';
import { isMobile } from '../../utils';

import style from './game.scss';

const DEFAULT_HOUSING_WIDTH     = 280;
const DEFAULT_HOUSING_HEIGHT    = 462;

type GCRect = {
    x: number;
    y: number;
    width: number;
    height: number;
}

const DEFAULT_CTRL: {
    [name: string]: GCRect;
} = {
    UP: { x: 47, y: 285, width: CTRL_DIR_WIDTH, height: CTRL_DIR_HEIGHT },
    DOWN: { x: 47, y: 323, width: CTRL_DIR_WIDTH, height: CTRL_DIR_HEIGHT },
    LEFT: { x: 28, y: 304, width: CTRL_DIR_WIDTH, height: CTRL_DIR_HEIGHT },
    RIGHT: { x: 66, y: 304, width: CTRL_DIR_WIDTH, height: CTRL_DIR_HEIGHT },
    A: { x: 225, y: 284, width: CTRL_ACTION_WIDTH, height: CTRL_ACTION_HEIGHT },
    B: { x: 178, y: 306, width: CTRL_ACTION_WIDTH, height: CTRL_ACTION_HEIGHT },
    SELECT: { x: 83, y: 375, width: CTRL_S_WIDTH, height: CTRL_S_HEIGHT },
    START: { x: 131, y: 375, width: CTRL_S_WIDTH, height: CTRL_S_HEIGHT },
};

type Props = {
    scale: GameState['scale'];
    keys: GameState['keys'];
};

type State = {
    key_Up_active: boolean;
    key_Down_active: boolean;
    key_Left_active: boolean;
    key_Right_active: boolean;
    key_A_active: boolean;
    key_B_active: boolean;
    key_Select_active: boolean;
    key_Start_active: boolean;
    isRunning: boolean;
};

const isRectIn = (offsetX: number, offsetY: number, t: Touch, rect: GCRect, scale: number, border: number) => {
    const cx = offsetX + rect.x * scale - border;
    const cy = offsetY + rect.y * scale - border;
    return (t.clientX >= cx
         && t.clientX <= (cx + rect.width * scale + border)
         && t.clientY >= cy
         && t.clientY <= (cy + rect.height * scale + border));
};


class GameComponent extends Component<Props, State> {
    private _gameRef = createRef();
    private _screenRef = createRef();
    private _fpsRef = createRef();
    public emu?: Emulator;

    constructor(props: Props) {
        super(props);
        this.state = {
            key_Up_active: false,
            key_Down_active: false,
            key_Left_active: false,
            key_Right_active: false,
            key_A_active: false,
            key_B_active: false,
            key_Select_active: false,
            key_Start_active: false,
            isRunning: false,
        };
        this._updateFrame = this._updateFrame.bind(this);
    }

    private _handleControlTouch(t: Touch) {
        const { x, y } = this._gameRef.current.getBoundingClientRect();
        const scale = window.screen.width / DEFAULT_HOUSING_WIDTH;
        const border = 6 * scale; // default size of the border

        if (isRectIn(x, y, t, DEFAULT_CTRL.UP, scale, border)) {
            this._pressCtrl(WButton.Up, true);
        } else if (isRectIn(x, y, t, DEFAULT_CTRL.DOWN, scale, border)) {
            this._pressCtrl(WButton.Down, true);
        } else if (isRectIn(x, y, t, DEFAULT_CTRL.LEFT, scale, border)) {
            this._pressCtrl(WButton.Left, true);
        } else if (isRectIn(x, y, t, DEFAULT_CTRL.RIGHT, scale, border)) {
            this._pressCtrl(WButton.Right, true);
        } else if (isRectIn(x, y, t, DEFAULT_CTRL.A, scale, border)) {
            this._pressCtrl(WButton.A, true);
        } else if (isRectIn(x, y, t, DEFAULT_CTRL.B, scale, border)) {
            this._pressCtrl(WButton.B, true);
        } else if (isRectIn(x, y, t, DEFAULT_CTRL.SELECT, scale, 0)) {
            this._pressCtrl(WButton.Select, true);
        } else if (isRectIn(x, y, t, DEFAULT_CTRL.START, scale, 0)) {
            this._pressCtrl(WButton.Start, true);
        }
    }

    private _handleTouch(event: TouchEvent) {
        switch (event.touches.length) {
            case 1:
                this._handleControlTouch(event.touches[0]);
                break;
            default:
                this._handleControlTouch(event.touches[0]);
                this._handleControlTouch(event.touches[1]);
                break;
        }
    }

    private _pressCtrl(button: WButton, isPressed: boolean) {
        this.setState({ [`key_${WButton[button]}_active`]: isPressed });
        if (this.emu) {
            this.emu.set_button(button, isPressed);
        }
    }

    private _handleKeyPress(keyCode: number, isPressed: boolean) {
        const keyMap: { [name: number]: number } = this.props.keys;

        for (let name in keyMap) {
            const code = keyMap[name];

            if (code == keyCode) {
                this._pressCtrl(name as unknown as WButton, isPressed);
            }
        }
    }

    private _updateFrame() {
        if (this.emu) {
            this._fpsRef.current.start();
            this.emu.update();
            this._screenRef.current.updateImage();
            this._fpsRef.current.end();
            if (this.state.isRunning) {
                requestAnimationFrame(this._updateFrame);
            }
        }
    }

    public async loadCartridge(file: File) {
        const bin = await file.arrayBuffer();
        const bin8 = new Uint8Array(bin);
        if (!this.emu) {
            // empty serial function for now
            this.emu = Emulator.new(bin8, () => undefined);
            this._screenRef.current.setFramebuffer(this.emu.framebuffer());
            await this.run();
        }
    }

    public async run() {
        await this.setState({ isRunning: true });
        this._updateFrame();
    }

    public stop() {
        this.setState({ isRunning: false });
    }

    public componentDidMount() {
        if (isMobile()) {
            if (this._gameRef && this._gameRef.current) {
                this._gameRef.current.addEventListener('touchstart', (event: TouchEvent) => {
                    this._handleTouch(event);
                });
                this._gameRef.current.addEventListener('touchend', () => {
                    this._pressCtrl(WButton.Up, false);
                    this._pressCtrl(WButton.Down, false);
                    this._pressCtrl(WButton.Left, false);
                    this._pressCtrl(WButton.Right, false);
                    this._pressCtrl(WButton.A, false);
                    this._pressCtrl(WButton.B, false);
                    this._pressCtrl(WButton.Select, false);
                    this._pressCtrl(WButton.Start, false);
                });
            }
        } else {
            document.addEventListener('keydown', (event: KeyboardEvent) => {
                event.preventDefault();
                this._handleKeyPress(event.keyCode, true);
            });
            document.addEventListener('keyup', (event) => {
                event.preventDefault();
                this._handleKeyPress(event.keyCode, false);
            });
        }
    }

    public render() {
        let { scale } = this.props;

        // Full screen on Mobile
        if (isMobile()) {
            scale = window.screen.width / DEFAULT_HOUSING_WIDTH;
        }
        return (
            <div class={style.container}>
                <div class={style.subcontainer}>
                    <CartridgeLoader onload={(f) => {
                        this.loadCartridge(f);
                    }}/>
                    <div ref={this._gameRef} class={style.game} style={{
                        width: DEFAULT_HOUSING_WIDTH * scale,
                        height: DEFAULT_HOUSING_HEIGHT * scale
                    }}>
                        <GameSection x={35}
                                       y={110}
                                       width={8}
                                       height={8}
                                       scale={scale}
                                       className={style.indicator + (this.state.isRunning ? ` ${style.active}` : '')} />
                        <Screen ref={this._screenRef}
                                x={60}
                                y={57}
                                width={160}
                                height={144}
                                scale={scale} />
                        <ControlDir x={DEFAULT_CTRL.UP.x}
                                    y={DEFAULT_CTRL.UP.y}
                                    scale={scale}
                                    active={this.state.key_Up_active} />
                        <ControlDir x={DEFAULT_CTRL.DOWN.x}
                                    y={DEFAULT_CTRL.DOWN.y}
                                    scale={scale}
                                    active={this.state.key_Down_active} />
                        <ControlDir x={DEFAULT_CTRL.LEFT.x}
                                    y={DEFAULT_CTRL.LEFT.y}
                                    scale={scale}
                                    active={this.state.key_Left_active} />
                        <ControlDir x={DEFAULT_CTRL.RIGHT.x}
                                    y={DEFAULT_CTRL.RIGHT.y}
                                    scale={scale}
                                    active={this.state.key_Right_active} />
                        <ControlAction x={DEFAULT_CTRL.A.x}
                                       y={DEFAULT_CTRL.A.y}
                                       scale={scale}
                                       active={this.state.key_A_active} />
                        <ControlAction x={DEFAULT_CTRL.B.x}
                                       y={DEFAULT_CTRL.B.y}
                                       scale={scale}
                                       active={this.state.key_B_active} />
                        <ControlS x={DEFAULT_CTRL.SELECT.x}
                                  y={DEFAULT_CTRL.SELECT.y}
                                  scale={scale}
                                  active={this.state.key_Select_active} />
                        <ControlS x={DEFAULT_CTRL.START.x}
                                  y={DEFAULT_CTRL.START.y}
                                  scale={scale}
                                  active={this.state.key_Start_active} />
                    </div>
                    <Fps ref={this._fpsRef} />
                </div>
            </div>
        );
    }
}

export const Game = connectStoreon('keys', 'scale', GameComponent);
