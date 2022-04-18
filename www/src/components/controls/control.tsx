import { FunctionalComponent, h } from 'preact';

import { GameSection, GameSectionProps } from '../game-section';

import style from './control.scss';

type Props = {
    active: boolean;
} & GameSectionProps;

const Control: FunctionalComponent<Props> = (props) => {
    let className = style.control;
    if (props.className) {
        className += ` ${style[props.className]}`;
    }
    if (props.active) {
        className += ` ${style.active}`;
    }
    return (
        <GameSection {...props} className={className} />
    );
}

export { Props as ControlProps };
export { Control };
