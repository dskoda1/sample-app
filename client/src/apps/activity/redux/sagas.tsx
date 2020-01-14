import {
  FETCH_ACTIVITY,
  fetchActivitySuccess,
  fetchActivityError,
} from './index';
import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
export default function*() {
  console.log('registering root activity saga');

  yield takeLatest(FETCH_ACTIVITY, fetchActivitySaga);
}

const fetchActivitySaga = function*() {
  console.log('in fetch activity saga');
  try {
    const res = yield call(axios.get, `/api/activity`);
    yield put(
      fetchActivitySuccess(
        res.data.activity,
        res.data.tags,
        res.data.activityTypes
      )
    );
  } catch (error) {
    yield put(fetchActivityError(error));
  }
};
