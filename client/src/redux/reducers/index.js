import { combineReducers } from "redux";

import todaysMatches from './todays_matches';
import matches from './matches';
import auth from './auth';
import notification from './notification';
import { routerReducer } from 'react-router-redux'


export default combineReducers({
  todaysMatches,
  matches,
  auth,
  notification,
  router: routerReducer,
})