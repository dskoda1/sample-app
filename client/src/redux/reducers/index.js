import { combineReducers } from 'redux';

import auth from './auth';
import notification from './notification';
import workouts from './workouts';
import exercises from './exercises';
import { sets } from './exercises';

import { ListReducer as listState } from 'apps/lists/redux';
import { ActivityReducer as activityState } from 'apps/activity/redux';

export default combineReducers({
  auth,
  notification,
  workouts,
  exercises,
  sets,
  listState,
  activityState,
});
