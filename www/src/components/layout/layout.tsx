import { FunctionalComponent, h } from 'preact';

import style from './layout.scss';

const Header: FunctionalComponent = ({ children }) => (
    <div class={style.header}>
        <div class="container">
            {children}
        </div>
    </div>
);

const Content: FunctionalComponent = ({ children }) => (
    <div class={`${style.content} container`}>
        {children}
    </div>
);

const Footer: FunctionalComponent = ({ children }) => (
    <div class={style.footer}>
        <div class="container">
            <nav class={style.navbar}>
                {children}
            </nav>
        </div>
    </div>
);

export { Header, Content, Footer };
