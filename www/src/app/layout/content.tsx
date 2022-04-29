import { FunctionalComponent, h } from 'preact';

const Content: FunctionalComponent = ({ children }) => (
    <div class="container">
        <div class="columns is-2">
            {children}
        </div>
    </div>
);

export { Content };
