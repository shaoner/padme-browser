import { FunctionalComponent, h } from 'preact';

const MainPanel: FunctionalComponent = ({ children }) => (
    <div class="column is-narrow">
        {children}
    </div>
);

export { MainPanel };
