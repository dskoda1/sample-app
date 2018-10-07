// @flow

import * as types from '../constants';

export const getMatches = () => ({ type: types.GET_MATCHES })
export const getTodaysMatches = () => ({ type: types.GET_TODAYS_MATCHES })

export const login = (username: string, password: string) => ({ type: types.LOGIN, username, password})
export const loginSuccess = (user) => ({ type: types.LOGIN_SUCCESS , user})
export const loginFailure = (error) => ({ type: types.LOGIN_FAILURE, error })

export const register = (username: string, password: string) => ({ type: types.REGISTER, username, password})
export const registerSuccess = (username) => ({ type: types.REGISTER_SUCCESS, user: { username } })
export const registerFailure = (error) => ({ type: types.REGISTER_FAILURE, error })

export const fetchProfile = () => ({ type: types.FETCH_PROFILE })
export const fetchProfileSuccess = (user) => ({ type: types.FETCH_PROFILE_SUCCESS, user })
export const fetchProfileFailure = (error) => ({ type: types.FETCH_PROFILE_FAILURE, error })

export const showNotification = (notification, variant) => ({ type: types.SHOW_NOTIFICATION, notification, variant })
export const hideNotification = () => ({ type: types.HIDE_NOTIFICATION })