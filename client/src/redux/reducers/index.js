import { combineReducers } from "redux";

import todaysMatches from './todays_matches';
import matches from './matches';

export default combineReducers({
  todaysMatches,
  matches,
})