import * as types from '../constants';

/** Workout actions */
/** Fetch workouts */
export const fetchWorkouts = () => ({ type: types.FETCH_WORKOUTS });
export const fetchWorkoutsSuccess = workouts => ({
  type: types.FETCH_WORKOUTS_SUCCESS,
  workouts,
});
export const fetchWorkoutsFailure = error => ({
  type: types.FETCH_WORKOUTS_FAILURE,
  error,
});

/** Fetch workout */
export const fetchWorkout = id => ({ type: types.FETCH_WORKOUT, id });
export const fetchWorkoutSuccess = workout => ({
  type: types.FETCH_WORKOUT_SUCCESS,
  workout,
});
export const fetchWorkoutFailure = error => ({
  type: types.FETCH_WORKOUT_FAILURE,
  error,
});

/** Create workout */
export const createWorkout = (name, pushHistory) => ({
  type: types.CREATE_WORKOUT,
  name,
  pushHistory,
});
export const createWorkoutSuccess = () => ({
  type: types.CREATE_WORKOUT_SUCCESS,
});
export const createWorkoutFailure = error => ({
  type: types.CREATE_WORKOUT_FAILURE,
  error,
});

/** Update workout */
export const updateWorkout = (id, body) => ({
  type: types.UPDATE_WORKOUT,
  id,
  body,
});
export const updateWorkoutSuccess = () => ({
  type: types.UPDATE_WORKOUT_SUCCESS,
});
export const updateWorkoutFailure = error => ({
  type: types.UPDATE_WORKOUT_FAILURE,
  error,
});
/** End workout actions */

/** Start exercise actions */
/** Create Exercise */
export const createExercise = (workoutId, name, exerciseType, pushHistory) => ({
  type: types.CREATE_EXERCISE,
  workoutId,
  name,
  exerciseType,
  pushHistory,
});
export const createExerciseSuccess = () => ({
  type: types.CREATE_EXERCISE_SUCCESS,
});
export const createExerciseFailure = error => ({
  type: types.CREATE_EXERCISE_FAILURE,
  error,
});

/** Delete Exercise */
export const deleteExercise = (workoutId, exerciseId) => ({
  type: types.DELETE_EXERCISE,
  workoutId,
  exerciseId,
});

export const deleteExerciseSuccess = () => ({
  type: types.DELETE_EXERCISE_SUCCESS,
});

export const deleteExerciseFailure = error => ({
  type: types.DELETE_EXERCISE_FAILURE,
  error,
});

/** End exercise actions */
