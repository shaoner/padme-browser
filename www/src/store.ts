import { persistState } from '@storeon/localstorage'
import { createStoreon } from 'storeon'

import settingsStore, { SettingsState, SettingsEvents } from './components/settings/store';

type State = SettingsState;

type Events = SettingsEvents;

const store = createStoreon<State, Events>([
    settingsStore,
    persistState(['settings']),
]);

export default store;
