import * as types from '../constants/types';
import { createError } from './error';

/*export function showCompany(user) {
    return {
        type: types.companies.SHOW,
        user
    };
}*/

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