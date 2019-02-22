import { takeLatest } from 'redux-saga/effects';

import { 
  LOGIN, LOGOUT, REGISTER, FETCH_PROFILE,
  FETCH_WORKOUTS, FETCH_WORKOUT,
} from '../constants';

import { loginSaga, registerSaga, logoutSaga, profileSaga } from './auth';
import { fetchWorkoutsSaga, fetchWorkoutSaga } from './workouts';

export default function*() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(FETCH_PROFILE, profileSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(FETCH_WORKOUT, fetchWorkoutSaga);
  yield takeLatest(FETCH_WORKOUTS, fetchWorkoutsSaga);
}
