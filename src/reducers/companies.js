
import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function companies(state = initialState.companies, action) { 
    switch (action.type) {
        case types.companies.CREATE: {
            const { companies } = action;
            let nextState = companies;
            return nextState;
        }
        default:
            return state;
    }
}