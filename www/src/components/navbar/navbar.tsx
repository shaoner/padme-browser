import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { Settings } from '../settings';

import style from './navbar.scss';

const NavBar: FunctionalComponent = () => {
    const [isOpen, setOpen] = useState(false);

    return (
        <nav class={style.navbar}>
            <a class={style.brand} href="#">Padme</a>
            <a href="#" onClick={() => setOpen(true)}><i class="icon icon-cog"/></a>
            <Settings isOpen={isOpen} onClose={() => setOpen(false)} />
        </nav>
    );
}

export { NavBar };
