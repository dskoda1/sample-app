import { takeLatest } from "redux-saga/effects";

import { GET_MATCHES, GET_TODAYS_MATCHES, LOGIN } from '../constants';

import matchesSaga from './matches';
import todaysMatchesSaga from './todays_matches';
import { loginSaga } from './auth';

export default function* () {
  yield takeLatest(GET_MATCHES, matchesSaga);
  yield takeLatest(GET_TODAYS_MATCHES, todaysMatchesSaga);
  yield takeLatest(LOGIN, loginSaga);
}