import axios from 'axios';
import { call, put } from 'redux-saga/effects';

import * as workoutActions from '../actions/workouts';
import * as actions from '../actions';

const fetchWorkoutsSaga = function*() {
  try {
    const response = yield call(axios.get, '/api/workouts');
    yield put(workoutActions.fetchWorkoutsSuccess(response.data.workouts));
  } catch (error) {
    yield put(
      actions.showNotification('Failed to fetch your workouts, sorry!', 'error')
    );
    yield put(workoutActions.fetchWorkoutsFailure(error));
  }
};

const fetchWorkoutSaga = function*({ id }) {
  try {
    const response = yield call(axios.get, `/api/workouts/${id}`);
    yield put(workoutActions.fetchWorkoutSuccess(response.data.workout));
  } catch (error) {
    yield put(
      actions.showNotification('Failed to fetch your workout, sorry!', 'error')
    );
    yield put(workoutActions.fetchWorkoutFailure(error));
  }
};

const updateWorkoutSaga = function*({ id, body }) {
  try {
    yield call(axios.put, `/api/workouts/${id}`, body);
    yield put(workoutActions.updateWorkoutSuccess());
    yield put(workoutActions.fetchWorkout(id));
  } catch (error) {
    yield put(actions.showNotification('Failed to update workout', 'error'));
    yield put(workoutActions.updateWorkoutFailure(error));
  }
};

const createWorkoutSaga = function*({ name, pushHistory }) {
  try {
    const res = yield call(axios.post, '/api/workouts', { name });
    yield put(workoutActions.createWorkoutSuccess());
    pushHistory(`/workouts/${res.data.id}`);
    yield put(actions.showNotification('Workout created successfully'));
  } catch (error) {
    yield put(actions.showNotification('Failed to create workout', 'error'));
    yield put(workoutActions.createWorkoutFailure(error));
  }
};

export {
  fetchWorkoutsSaga,
  fetchWorkoutSaga,
  updateWorkoutSaga,
  createWorkoutSaga,
};
