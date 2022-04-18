import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { Settings } from '../settings';

import style from './header.scss';

const Header: FunctionalComponent = () => {
    const [isOpen, setOpen] = useState(false);

    return (
        <nav class={style.container}>
            <a class={style.brand} href="#">Padme</a>
            <a href="#" onClick={() => setOpen(true)}><i class="icon icon-cog"/></a>
            <Settings isOpen={isOpen} onClose={() => setOpen(false)} />
        </nav>
    );
}

export { Header };
