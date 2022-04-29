import { FunctionalComponent, h } from 'preact';

const Footer: FunctionalComponent = ({ children }) => (
    <div class="footer">
        <div class="content is-size-6 has-text-centered">
            {children}
        </div>
    </div>
);

export { Footer };
