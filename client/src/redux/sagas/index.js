import { takeLatest } from "redux-saga/effects";

import { GET_MATCHES, GET_TODAYS_MATCHES, LOGIN, REGISTER, FETCH_PROFILE } from '../constants';

import matchesSaga from './matches';
import todaysMatchesSaga from './todays_matches';
import { loginSaga, registerSaga, profileSaga } from './auth';

export default function* () {
  yield takeLatest(GET_MATCHES, matchesSaga);
  yield takeLatest(GET_TODAYS_MATCHES, todaysMatchesSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(FETCH_PROFILE, profileSaga);
}