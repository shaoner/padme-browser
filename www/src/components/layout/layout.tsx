import { FunctionalComponent, h } from 'preact';

const Header: FunctionalComponent = ({ children }) => (
    <header>
        {children}
    </header>
);

const Content: FunctionalComponent = ({ children }) => (
    <div class="container">
        <div class="columns is-2">
            {children}
        </div>
    </div>
);

const SidePanel: FunctionalComponent = ({ children }) => (
    <div class="column is-hidden-touch">
        <div style={{minWidth: '200px'}}>
            {children}
        </div>
    </div>
);

const MainPanel: FunctionalComponent = ({ children }) => (
    <div class="column is-narrow">
        {children}
    </div>
);

const Footer: FunctionalComponent = ({ children }) => (
    <div class="footer">
        <div class="content is-size-6 has-text-centered">
            {children}
        </div>
    </div>
);

export { Header, Content, Footer, MainPanel, SidePanel };
