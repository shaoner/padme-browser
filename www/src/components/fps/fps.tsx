import { Component, h } from 'preact';

import style from './fps.scss';

type Props = {};

type State = {
    fps: number;
};

class FpsComponent extends Component<Props, State> {
    private _frameCount: number;
    private _startTime: number;
    private _endTime: number;

    constructor(props: Props) {
        super(props);
        this.state = {
            fps: 0,
        };
        this._frameCount = 0;
        this._startTime = 0;
        this._endTime = 0;
    }

    public start() {
        this._startTime = new Date().getTime();
    }

    public update(extra: number) {
        this._startTime = new Date().getTime() - extra;
        ++this._frameCount;
    }

    public elapsed(): number {
        const endTime = new Date().getTime();

        if ((this._startTime - this._endTime) >= 1000) {
            this.setState({ fps: this._frameCount });
            this._endTime = endTime;
            this._frameCount = 0;
        }

        return endTime - this._startTime;
    }

    render() {
        return (
            <div class={style.container}>
                <span class={style.label}>FPS:</span>
                <span class={style.fps}>{this.state.fps}</span>
            </div>
        );
    }
}

export const Fps = FpsComponent;
