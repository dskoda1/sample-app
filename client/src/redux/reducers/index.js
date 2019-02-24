import { combineReducers } from 'redux';

import auth from './auth';
import notification from './notification';
import workouts from './workouts';

export default combineReducers({
  auth,
  notification,
  workouts,
});
