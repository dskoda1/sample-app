import { takeLatest } from 'redux-saga/effects';

import {
  LOGIN,
  LOGOUT,
  REGISTER,
  FETCH_PROFILE,
  FETCH_WORKOUTS,
  FETCH_WORKOUT,
  UPDATE_WORKOUT,
  CREATE_WORKOUT,
  CREATE_EXERCISE,
} from '../constants';

import { loginSaga, registerSaga, logoutSaga, profileSaga } from './auth';
import {
  fetchWorkoutsSaga,
  fetchWorkoutSaga,
  updateWorkoutSaga,
  createWorkoutSaga,
} from './workouts';
import { createExerciseSaga } from './exercises';

export default function*() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(FETCH_PROFILE, profileSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(CREATE_WORKOUT, createWorkoutSaga);
  yield takeLatest(FETCH_WORKOUT, fetchWorkoutSaga);
  yield takeLatest(FETCH_WORKOUTS, fetchWorkoutsSaga);
  yield takeLatest(UPDATE_WORKOUT, updateWorkoutSaga);

  yield takeLatest(CREATE_EXERCISE, createExerciseSaga);
}
