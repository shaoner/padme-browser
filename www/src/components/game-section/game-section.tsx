import { FunctionalComponent, h } from 'preact';

interface Props {
    x: number;
    y: number;
    width: number;
    height: number;
    className?: string;
    scale?: number;
}

const GameSection: FunctionalComponent<Props> = ({
    x,
    y,
    width,
    height,
    className,
    scale = 1,
    children
}) => (
    <div style={{
        position: 'absolute',
        top: y * scale + 'px',
        left: x * scale + 'px',
        width: width * scale + 'px',
        height: height * scale + 'px',
    }} class={className}>
        {children}
    </div>
);

export { Props as GameSectionProps };
export { GameSection };
