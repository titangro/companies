    
import { combineReducers } from 'redux';

import { error } from './error';
import { loading } from './loading';
import { companies, company, managers } from './companies';

const rootReducer = combineReducers({
    loading,
    error,
    companies,
    company,
    managers
});

export default rootReducer;