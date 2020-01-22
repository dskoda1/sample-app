import {
  FETCH_ACTIVITY,
  fetchActivity,
  fetchActivitySuccess,
  fetchActivityError,
  postActivityAction,
  postActivitySuccess,
  postActivityError,
  POST_ACTIVITY,
  DELETE_ACTIVITY,
  deleteActivityAction,
  deleteActivitySuccess,
  deleteActivityError,
} from './index';
import { takeLatest, put, call } from 'redux-saga/effects';
import { showNotification } from 'redux/actions';
import axios from 'axios';
export default function*() {
  yield takeLatest(FETCH_ACTIVITY, fetchActivitySaga);
  yield takeLatest(POST_ACTIVITY, postActivitySaga);
  yield takeLatest(DELETE_ACTIVITY, deleteActivitySaga);
}

const fetchActivitySaga = function*() {
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

const postActivitySaga = function*({
  activityTypeName,
  tagName,
  timestamp,
  duration,
}: postActivityAction) {
  try {
    yield call(axios.post, '/api/activity', {
      activityTypeName,
      tagName,
      timestamp,
      duration,
    });
    yield put(postActivitySuccess());
    yield put(showNotification('Activity saved successfully', 'success'));
    // reload
    yield put(fetchActivity());
  } catch (error) {
    yield put(postActivityError(error));
  }
};

const deleteActivitySaga = function*({ activityId }: deleteActivityAction) {
  try {
    yield call(axios.delete, `/api/activity/${activityId}`);
    yield put(deleteActivitySuccess());
    // reload
    yield put(fetchActivity());
  } catch (error) {
    yield put(deleteActivityError(error));
  }
};
