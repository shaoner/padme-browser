import { FunctionalComponent, h } from 'preact';

import { Control, ControlProps } from './control';

const CTRL_DIR_WIDTH    = 12;
const CTRL_DIR_HEIGHT   = 12;

type Props = {
    x: ControlProps['x'];
    y: ControlProps['y'];
    scale: ControlProps['scale'];
    active: ControlProps['active'];
};

const ControlDir: FunctionalComponent<Props> = (props) => (
    <Control width={CTRL_DIR_WIDTH}
             height={CTRL_DIR_HEIGHT}
             className="control-dir" {...props} />
);

export {
    CTRL_DIR_HEIGHT,
    CTRL_DIR_WIDTH,
    ControlDir,
};
