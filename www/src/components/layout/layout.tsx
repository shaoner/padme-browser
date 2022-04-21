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
        <div class="row">
            {children}
        </div>
    </div>
);

const Panel: FunctionalComponent = ({ children }) => (
    <div class="four columns">
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

export { Header, Content, Footer, Panel };
