import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from './theme';
import App from './containers/App';
import { store } from './redux/store';

import apolloClient from 'apollo';
import { ApolloProvider } from '@apollo/react-hooks';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Router>
            <App />
          </Router>
        </MuiPickersUtilsProvider>
      </ApolloProvider>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
