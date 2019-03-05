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
