import { FunctionalComponent, h } from 'preact';

const SidePanel: FunctionalComponent = ({ children }) => (
    <div class="column is-hidden-touch">
        <div class="pt-4" style={{minWidth: '200px'}}>
            {children}
        </div>
    </div>
);

export { SidePanel };
