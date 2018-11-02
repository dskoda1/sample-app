import { combineReducers } from 'redux';

import auth from './auth';
import notification from './notification';

export default combineReducers({
  auth,
  notification,
});
