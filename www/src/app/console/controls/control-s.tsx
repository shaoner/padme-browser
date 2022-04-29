import { FunctionalComponent, h } from 'preact';

import { Control, ControlProps } from './control';

const CTRL_S_WIDTH      = 34;
const CTRL_S_HEIGHT     = 10;

type Props = {
    x: ControlProps['x'];
    y: ControlProps['y'];
    scale: ControlProps['scale'];
    active: ControlProps['active'];
};

const ControlS: FunctionalComponent<Props> = (props) => (
    <Control width={32} height={10} className="control-s" {...props} />
);

export {
    CTRL_S_HEIGHT,
    CTRL_S_WIDTH,
    ControlS
};
