import { FunctionalComponent, h } from 'preact';

import style from './footer.scss';

const Footer: FunctionalComponent = () => (
    <footer class={style.container}>
        v{process.env.VERSION} | <a href={process.env.GIT_LINK}>{process.env.GIT_SHA}</a>
    </footer>
);

export { Footer }
