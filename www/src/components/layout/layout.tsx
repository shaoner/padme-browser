import { FunctionalComponent, h } from 'preact';

import style from './layout.scss';

const Header: FunctionalComponent = ({ children }) => (
    <div class={style.header}>
        {children}
    </div>
);

const Content: FunctionalComponent = ({ children }) => (
    <div class={style.content}>
        {children}
    </div>
);

const Footer: FunctionalComponent = ({ children }) => (
    <div class={style.footer}>
        {children}
    </div>
);

export { Header, Content, Footer };
