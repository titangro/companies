import * as types from '../constants/types';
import { createError } from './error';

export function createCompanies(url, params) {
    return dispatch => {
        return fetch(url, params)
            .then(res => res.json())
            .then(companies => {
                dispatch({
                    type: types.companies.CREATE,
                    companies
                });
            })
            .catch(err => dispatch(createError(err)));
    };
}

export function activateCompany(company) {
    return dispatch => 
        dispatch({
            type: types.companies.ACTIVATE,
            company
        })
}

export function showManagers(company) {
    return dispatch => 
        dispatch({
            type: types.companies.SHOW_MANAGERS,
            company
        })
}

export function addManager(companyId, manager) {
    return dispatch => 
        dispatch({
            type: types.companies.ADD_MANAGER,
            manager,
            companyId
        })
}