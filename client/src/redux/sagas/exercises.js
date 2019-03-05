import axios from 'axios';
import { call, put } from 'redux-saga/effects';

import * as workoutActions from '../actions/workouts';
import * as actions from '../actions';

const createExerciseSaga = function*({
  workoutId,
  name,
  exerciseType,
  pushHistory,
}) {
  try {
    const res = yield call(axios.post, `/api/workouts/${workoutId}/exercises`, {
      name: name,
      type: exerciseType,
    });
    yield put(workoutActions.createExerciseSuccess());
    yield put(workoutActions.fetchWorkout(workoutId));
    pushHistory(`/workouts/${workoutId}/exercises/${res.data.id}`);
    yield put(actions.showNotification('Exercise created successfully'));
  } catch (error) {
    yield put(actions.showNotification('Failed to create exercise', 'error'));
    yield put(workoutActions.createExerciseFailure(error));
  }
};

export { createExerciseSaga };
