// @flow
import axios from 'axios';
import { call, put } from 'redux-saga/effects';

import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS } from '../constants';

const loginEndpoint = (username, password) => {
    console.log(username, password);
    return axios.post('/api/login', {username, password});
}

const loginSaga = function* ({username, password}) {
    yield put({type: LOGIN})
    try {
        const response = yield call(loginEndpoint, username, password);
        yield put({ 
            type: LOGIN_SUCCESS, 
            user: {username: response.data.username},
        })
    } 
    catch (error) {
        yield put({ type: LOGIN_FAILURE, error})
    }
}

export {
    loginSaga
};