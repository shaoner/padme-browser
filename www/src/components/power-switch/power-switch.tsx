import { FunctionalComponent, h } from 'preact';
import { GameSection, GameSectionProps } from '../game-section';

import style from './power-switch.scss';

type Props = {
    toggled: boolean;
    onChange: (toggled: boolean) => void;
} & GameSectionProps;

const PowerSwitch: FunctionalComponent<Props> = ({ toggled, onChange, ...props }) => (
    <GameSection className={style.powerswitch} {...props}>
        <div class={style.arrowleft}></div><span class={style.label}>OFF</span>
        <label class={style.switch}>
            <input type="checkbox" checked={toggled} onChange={() => onChange(!toggled)} />
            <span class={style.knob}></span>
        </label>
        <span class={style.label}>ON</span><div class={style.arrowright}></div>
    </GameSection>
);
export { PowerSwitch };
