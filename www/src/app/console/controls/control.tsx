import { FunctionalComponent, h } from 'preact';

import { Scalable, ScalableProps } from '@app/components/scalable';

import style from './control.scss';

type Props = {
    active: boolean;
} & ScalableProps;

const Control: FunctionalComponent<Props> = (props) => {
    let className = style.control;
    if (props.className) {
        className += ` ${style[props.className]}`;
    }
    if (props.active) {
        className += ` ${style.active}`;
    }
    return (
        <Scalable {...props} className={className} />
    );
}

export { Props as ControlProps };
export { Control };
