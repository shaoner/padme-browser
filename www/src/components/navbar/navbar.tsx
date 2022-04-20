import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { Help } from '../help';
import { Settings } from '../settings';

import style from './navbar.scss';

const NavBar: FunctionalComponent = () => {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);

    return (
        <nav class={style.navbar}>
            <a class={style.brand} href="#">Padme</a>
            <div class={style.rightmenu}>
                <a href="#" onClick={() => setHelpOpen(true)}><i class="icon icon-question"></i></a>
                <a href="#" onClick={() => setSettingsOpen(true)}><i class="icon icon-cog"/></a>
            </div>
            <Settings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
            <Help isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
        </nav>
    );
}

export { NavBar };
