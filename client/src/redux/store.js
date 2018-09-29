import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

import { routerMiddleware } from 'react-router-redux';
import createHistory from "history/createBrowserHistory";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createHistory();

// create a redux store with our reducer above and middleware
let store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history),
    ),
  ),
);

// run the saga
sagaMiddleware.run(rootSaga);

export {
  store,
  history,
};