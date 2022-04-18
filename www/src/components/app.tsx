import { FunctionalComponent, h } from 'preact';
import { StoreContext } from 'storeon/preact';

import { Header } from './header';
import { Game } from './game';

import store from '../store';

const App: FunctionalComponent = () => (
    <StoreContext.Provider value={store}>
        <Header />
        <Game />
    </StoreContext.Provider>
);

export default App;
