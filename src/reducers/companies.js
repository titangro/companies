
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
            const { company } = action;
            let nextState = company.data.managers ? company.data.managers : [];
            let parsedManagers = localStorage.managers ? JSON.parse(localStorage.managers) : [];
            parsedManagers = parsedManagers[company.data.hid] ? parsedManagers[company.data.hid] : [];
            nextState = [...nextState, ...parsedManagers];
            return nextState;
        }
        case types.companies.ADD_MANAGER: {
            const { manager, companyId } = action;
            if (!localStorage.managers) {
                let companyManager = {};
                companyManager[companyId] = [manager];
                localStorage.managers = JSON.stringify(companyManager);
            } else {
                let managers = JSON.parse(localStorage.managers);
                managers[companyId] = [...managers[companyId], manager];
                localStorage.managers = JSON.stringify(managers);
            }
            let nextState = [...state, manager];
            return nextState;
        }
        default:
            return state;
    }
}