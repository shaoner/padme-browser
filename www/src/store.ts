import { persistState } from '@storeon/localstorage'
import { createStoreon } from 'storeon'

import settingsStore, { SettingsState, SettingsEvents } from './components/settings/store';
import cartridgeStore, { CartridgeState, CartridgeEvents } from './components/cartridge-loader/store';
import serialStore, { SerialState, SerialEvents } from './components/serial-console/store';

export type State = SettingsState & CartridgeState & SerialState;

export type Events = SettingsEvents & CartridgeEvents & SerialEvents;

const store = createStoreon<State, Events>([
    settingsStore,
    cartridgeStore,
    serialStore,
    persistState(['settings']),
]);

export default store;
