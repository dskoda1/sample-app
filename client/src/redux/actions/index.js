// @flow

import * as types from '../constants';

export const getMatches = () => ({ type: types.GET_MATCHES })
export const getTodaysMatches = () => ({ type: types.GET_TODAYS_MATCHES })

export const login = (username: string, password: string) => ({ type: types.LOGIN, username, password})
export const loginSuccess = () => ({ type: types.LOGIN_SUCCESS })
export const loginFailure = (error) => ({ type: types.LOGIN_FAILURE, error })