// @flow
import axios from 'axios';
import { call, put } from 'redux-saga/effects';

import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS } from '../constants';

const loginEndpoint = (username, password) => {
    console.log(username, password);
    return axios.post('/api/login', {username, password});
}

const loginSaga = function* ({username, password}) {
    console.log(username, password);
    try {
        const response = yield call(loginEndpoint, username, password);
        console.log(response)
    } 
    catch (error) {
        yield put({ type: LOGIN_FAILURE, error})
    }
}

export {
    loginSaga
};