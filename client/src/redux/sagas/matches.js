import axios from 'axios';
import { call, put } from 'redux-saga/effects';

import { GET_MATCHES_FAILURE, GET_MATCHES_SUCCESS } from '../constants';


const fetchMatches = () => {
    return axios.get('https://worldcup.sfg.io/matches');
};

export default function* () {
    try {
        const response = yield call(fetchMatches);
        const matches = response.data;

        yield put({ type: GET_MATCHES_SUCCESS, matches });
    }
    catch (error) {
        yield put({ type: GET_MATCHES_FAILURE, error });
    }
}
