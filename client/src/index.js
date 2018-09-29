import React from 'react';
import { render } from 'react-dom';

import { 
    ConnectedRouter,
} from 'react-router-redux';
import { Provider } from "react-redux";
import './index.css';

import App from './App';
import { store, history } from './redux/store';

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
