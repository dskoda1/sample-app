import * as types from '../constants';

export const login = (username, password) => ({
  type: types.LOGIN,
  username,
  password,
});
export const loginSuccess = user => ({ type: types.LOGIN_SUCCESS, user });
export const loginFailure = error => ({ type: types.LOGIN_FAILURE, error });

export const logout = () => ({ type: types.LOGOUT });
export const logoutSuccess = () => ({ type: types.LOGOUT_SUCCESS });
export const logoutFailure = error => ({ type: types.LOGOUT_FAILURE, error });

export const register = (username, password) => ({
  type: types.REGISTER,
  username,
  password,
});
export const registerSuccess = username => ({
  type: types.REGISTER_SUCCESS,
  user: { username },
});
export const registerFailure = error => ({
  type: types.REGISTER_FAILURE,
  error,
});

export const fetchProfile = () => ({ type: types.FETCH_PROFILE });
export const fetchProfileSuccess = user => ({
  type: types.FETCH_PROFILE_SUCCESS,
  user,
});
export const fetchProfileFailure = error => ({
  type: types.FETCH_PROFILE_FAILURE,
  error,
});

export const showNotification = (notification, variant) => ({
  type: types.SHOW_NOTIFICATION,
  notification,
  variant,
});
export const hideNotification = () => ({ type: types.HIDE_NOTIFICATION });

/** Workout actions */
export const fetchWorkouts = () => ({ type: types.FETCH_WORKOUTS });
export const fetchWorkoutsSuccess = workouts => ({
  type: types.FETCH_WORKOUTS_SUCCESS,
  workouts,
});
export const fetchWorkoutsFailure = error => ({
  type: types.FETCH_WORKOUTS_FAILURE,
  error,
});

export const fetchWorkout = id => ({ type: types.FETCH_WORKOUT, id });
export const fetchWorkoutSuccess = workout => ({
  type: types.FETCH_WORKOUT_SUCCESS,
  workout,
});
export const fetchWorkoutFailure = error => ({
  type: types.FETCH_WORKOUT_FAILURE,
  error,
});

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
