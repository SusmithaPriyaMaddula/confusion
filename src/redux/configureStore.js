import {createStore} from 'redux';
import { Reducer, initialState } from './Reducer.js'

export const ConfigureStore = () => {
    const store = createStore(
        Reducer, // reducer
        initialState, // our initialState
    );

    return store;
}