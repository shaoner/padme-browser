import { persistState } from '@storeon/localstorage'
import { createStoreon } from 'storeon'

import gameReducer, { GameState, GameEvents } from './components/game/state';

type State = GameState;

type Events = GameEvents;

const store = createStoreon<State, Events>([
    gameReducer,
    persistState(),
]);

export default store;
