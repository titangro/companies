
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

export function managers(state = initialState.managers, action) {
    switch (action.type) {
        case types.companies.SHOW_MANAGERS: {
            const { managers } = action;
            let nextState = managers;
            return nextState;
        }
        case types.companies.ADD_MANAGER: {
            const { manager, companyId } = action;
            if (localStorage.managers) {
                localStorage.managers[companyId] = JSON.stringify([manager]);
            } else {
                localStorage.managers = JSON.stringify([...JSON.parse(localStorage.managers)[companyId], manager]);
            }
            let nextState = [...state, manager];
            return nextState;
        }
        default:
            return state;
    }
}