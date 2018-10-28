import axios from 'axios';
import { call, put } from 'redux-saga/effects';

import { GET_TODAYS_MATCHES_FAILURE, GET_TODAYS_MATCHES_SUCCESS } from '../constants';


const fetchTodaysMatches = () => {
    return axios.get('https://worldcup.sfg.io/matches/today');
};

export default function* () {
    try {
        yield put({ type: GET_TODAYS_MATCHES_SUCCESS, matches: [] });
    } catch (error) {
        yield put({ type: GET_TODAYS_MATCHES_FAILURE, error });
    }
}
