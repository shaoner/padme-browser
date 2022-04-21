import { persistState } from '@storeon/localstorage'
import { createStoreon } from 'storeon'

import settingsStore, { SettingsState, SettingsEvents } from './components/settings/store';
import cartridgeStore, { CartridgeState, CartridgeEvents } from './components/cartridge-loader/store';

type State = SettingsState & CartridgeState;

type Events = SettingsEvents & CartridgeEvents;

const store = createStoreon<State, Events>([
    settingsStore,
    cartridgeStore,
    persistState(['settings']),
]);

export default store;
