// @flow
import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';


import { LOGIN_FAILURE, LOGIN_SUCCESS } from '../constants';
import { showNotification } from '../actions';

const loginEndpoint = (username, password) => {
    return axios.post('/api/login', {username, password});
}

const loginSaga = function* ({username, password}) {
    try {
        const response = yield call(loginEndpoint, username, password);
        yield put({ 
            type: LOGIN_SUCCESS, 
            user: {username: response.data.username},
        })
        yield put(showNotification(`Welcome back ${username}!`, 'success'));
        yield put(push('/'));
    } 
    catch (error) {
        yield put(showNotification('Invalid username or password', 'error'))
        yield put({ type: LOGIN_FAILURE, error})
    }
}

export {
    loginSaga
};