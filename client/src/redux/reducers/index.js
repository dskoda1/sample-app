import { combineReducers } from 'redux';

import auth from './auth';
import notification from './notification';
import workouts from './workouts';
import exercises from './exercises';
import { sets } from './exercises';

export default combineReducers({
  auth,
  notification,
  workouts,
  exercises,
  sets,
});
