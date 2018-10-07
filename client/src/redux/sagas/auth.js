// @flow
import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import * as actions from '../actions';

const authEndpoint = (action, username, password) => {
    return axios.post(`/api/${action}`, {username, password});
}

const loginSaga = function* ({username, password}) {
    try {
        const response = yield call(authEndpoint, 'login', username, password);
        yield put(actions.loginSuccess({username: response.data.username}))
        yield put(actions.showNotification(`Welcome back, ${username}!`, 'success'));
        yield put(push('/'));
    } 
    catch (error) {
        yield put(actions.showNotification('Invalid username or password', 'error'))
        yield put(actions.loginFailure(error))
    }
}

const registerSaga = function* ({username, password}) {
    try {
        const response = yield call(authEndpoint, 'register', username, password);
        yield put(actions.registerSuccess(response.data.username))
        yield put(actions.showNotification(`Welcome ${username}!`, 'success'));
        yield put(push('/'));
    } 
    catch (error) {
        yield put(actions.showNotification('Invalid username or password', 'error'))
        yield put(actions.registerFailure(error))
    }
}

const profileSaga = function* () {
    try {
        const response = yield call(axios.get, '/api/profile')
        yield put(actions.fetchProfileSuccess({username: response.data.username}))
    }
    catch (error) {
        yield put(actions.fetchProfileFailure())
    }
}

export {
    loginSaga,
    registerSaga,
    profileSaga
};