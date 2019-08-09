import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function error(state = initialState.error, action) {
    switch (action.type) {
        case types.app.ERROR:
            return action.info ? action.error + ': ' + action.info : action.error;
        case types.app.ERROR_DELETE:
            return null;
        default:
            return state;
    }
}