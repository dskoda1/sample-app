import { takeLatest } from 'redux-saga/effects';

import { LOGIN, LOGOUT, REGISTER, FETCH_PROFILE } from '../constants';

import { loginSaga, registerSaga, logoutSaga, profileSaga } from './auth';

export default function*() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(FETCH_PROFILE, profileSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}
