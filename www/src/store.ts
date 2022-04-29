import { persistState } from '@storeon/localstorage'
import { createStoreon } from 'storeon'

import settingsState, { SettingsState, SettingsEvents } from '@app/settings/settings.state';
import cartridgeState, { CartridgeState, CartridgeEvents } from '@app/console/cartridge-loader/cartridge.state';
import serialState, { SerialState, SerialEvents } from '@app/serial-console/serial.state';

export type State = SettingsState & CartridgeState & SerialState;

export type Events = SettingsEvents & CartridgeEvents & SerialEvents;

const store = createStoreon<State, Events>([
    settingsState,
    cartridgeState,
    serialState,
    persistState(['settings']),
]);

export default store;
