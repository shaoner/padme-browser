import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { Help } from '../help';
import { Settings } from '../settings';

const NavBar: FunctionalComponent = () => {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);
    const [menuActive, showMenu] = useState(false);

    return (
        <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
            <div class="navbar-menu"></div>
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    <img src={require('./logo.svg')} />
                </a>
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" onClick={() => showMenu(!menuActive)}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div class={`navbar-menu ${menuActive ? 'is-active' : ''}`}>
                <div class="navbar-start">
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <a href="#" onClick={() => setHelpOpen(true)}>
                            <span class="icon"><i class="padme icon-question"></i></span>
                        </a>
                    </div>
                    <div class="navbar-item">
                        <a href="#" onClick={() => setSettingsOpen(true)}>
                            <span class="icon"><i class="padme icon-cog"></i></span>
                        </a>
                    </div>
                </div>
            </div>
            <Settings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
            <Help isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
        </nav>
    );
}

export { NavBar };
