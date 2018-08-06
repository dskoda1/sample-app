import { takeLatest } from "redux-saga/effects";

import { GET_MATCHES, GET_TODAYS_MATCHES } from '../constants';

import matchesSaga from './matches';
import todaysMatchesSaga from './todays_matches';

export default function* () {
  yield takeLatest(GET_MATCHES, matchesSaga);
  yield takeLatest(GET_TODAYS_MATCHES, todaysMatchesSaga);
}