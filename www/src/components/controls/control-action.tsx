import { FunctionalComponent, h } from 'preact';

import { Control, ControlProps } from './control';

const CTRL_ACTION_WIDTH         = 18;
const CTRL_ACTION_HEIGHT        = 18;

type Props = {
    x: ControlProps['x'];
    y: ControlProps['y'];
    scale: ControlProps['scale'];
    active: ControlProps['active'];
};

const ControlAction: FunctionalComponent<Props> = (props) => (
    <Control width={18} height={18} className="control-action" {...props} />
);

export {
    CTRL_ACTION_HEIGHT,
    CTRL_ACTION_WIDTH,
    ControlAction
};
