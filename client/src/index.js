import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import { MuiThemeProvider } from '@material-ui/core/styles';

import './index.css';

import theme from './theme';
import App from './containers/App';
import { store } from './redux/store';

render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <Router>
                <App />
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
