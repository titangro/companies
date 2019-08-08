
import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function companies(state = initialState.companies, action) {
    switch (action.type) {
        case types.companies.CREATE: {
            const { companies } = action;
            let nextState = companies.suggestions;
            return nextState;
        }
        default:
            return state;
    }
}

export function company(state = initialState.company, action) {
    switch (action.type) {
        case types.companies.ACTIVATE: {
            const { company } = action;
            let nextState = company;
            return nextState;
        }
        default:
            return state;
    }
}