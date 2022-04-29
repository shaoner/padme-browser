import { FunctionalComponent, h } from 'preact';

import { Control, ControlProps } from './control';

const CTRL_ACTION_WIDTH         = 28;
const CTRL_ACTION_HEIGHT        = 28;

type Props = {
    x: ControlProps['x'];
    y: ControlProps['y'];
    scale: ControlProps['scale'];
    active: ControlProps['active'];
};

const ControlAction: FunctionalComponent<Props> = (props) => (
    <Control width={CTRL_ACTION_WIDTH} height={CTRL_ACTION_HEIGHT} className="control-action" {...props} />
);

export {
    CTRL_ACTION_HEIGHT,
    CTRL_ACTION_WIDTH,
    ControlAction
};
