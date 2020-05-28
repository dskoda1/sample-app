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
  DELETE_EXERCISE,
  CREATE_SET,
  DELETE_SET,
} from '../constants';

import { loginSaga, registerSaga, logoutSaga, profileSaga } from './auth';
import {
  fetchWorkoutsSaga,
  fetchWorkoutSaga,
  updateWorkoutSaga,
  createWorkoutSaga,
  createSetSaga,
  deleteSetSaga,
} from './workouts';
import { createExerciseSaga, deleteExerciseSaga } from './exercises';
import rootListSaga from 'apps/lists/redux/sagas';
import rootActivitySaga from 'apps/activity/redux/sagas';

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
  yield takeLatest(DELETE_EXERCISE, deleteExerciseSaga);
  yield takeLatest(CREATE_SET, createSetSaga);
  yield takeLatest(DELETE_SET, deleteSetSaga);
  yield* rootActivitySaga();
  yield* rootListSaga();
}
