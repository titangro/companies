import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import initialReduxState from './constants/initialState';

import 'bootstrap/dist/css/bootstrap.min.css';

import './css/normalize.css';
import './css/style.css';

import App from './App';

const store = configureStore(initialReduxState);

ReactDOM.render(
    <Provider store={store}>
        <App store={store} />
    </Provider>, 
    document.getElementById('root')
);
