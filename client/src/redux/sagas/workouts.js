import axios from 'axios';
import { call, put } from 'redux-saga/effects';

import * as actions from '../actions';

const fetchWorkoutsSaga = function*() {
  try {
    const response = yield call(axios.get, '/api/workouts');
    yield put(actions.fetchWorkoutsSuccess(response.data.workouts));
  } catch (error) {
    yield put(
      actions.showNotification('Failed to fetch your workouts, sorry!', 'error')
    );
    yield put(actions.fetchWorkoutsFailure(error));
  }
};

const fetchWorkoutSaga = function*({ id }) {
  try {
    const response = yield call(axios.get, `/api/workouts/${id}`);
    yield put(actions.fetchWorkoutSuccess({ workout: response.data.workout }));
  } catch (error) {
    yield put(
      actions.showNotification('Failed to fetch your workout, sorry!', 'error')
    );
    yield put(actions.fetchWorkoutFailure(error));
  }
};

export { fetchWorkoutsSaga, fetchWorkoutSaga };
