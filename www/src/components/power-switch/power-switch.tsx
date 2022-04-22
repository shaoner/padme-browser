import { FunctionalComponent, h } from 'preact';
import { GameSection, GameSectionProps } from '../game-section';

import style from './power-switch.scss';

type Props = {
    toggled: boolean;
    onChange: (toggled: boolean) => void;
} & GameSectionProps;

const PowerSwitch: FunctionalComponent<Props> = ({ toggled, onChange, ...props }) => (
    <GameSection className={style.powerswitch} {...props}>
        OFF
        <label class={style.switch}>
            <input type="checkbox" checked={toggled} onChange={() => onChange(!toggled)} />
            <span class={style.knob}></span>
        </label>
        ON
    </GameSection>
);
export { PowerSwitch };
