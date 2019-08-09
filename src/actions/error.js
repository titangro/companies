import * as types from '../constants/types';

export function createError(error, info) {
    return dispatch => 
        dispatch({
            type: types.app.ERROR,
            error,
            info
        })    
}

export function deleteError() {
    return dispatch => 
        dispatch({
            type: types.app.ERROR_DELETE
        })    
}