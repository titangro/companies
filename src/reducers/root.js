    
import { combineReducers } from 'redux';

import { error } from './error';
import { loading } from './loading';
import { companies, company } from './companies';

const rootReducer = combineReducers({
    loading,
    error,
    companies,
    company
});

export default rootReducer;