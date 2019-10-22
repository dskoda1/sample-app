import {
  FETCH_LISTS,
  fetchListsSuccess,
  List,
  ListItem,
  fetchListsError,
} from './index';
import { takeLatest, put } from 'redux-saga/effects';

export default function*() {
  yield takeLatest(FETCH_LISTS, fetchListsSaga);
}
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchListsSaga = function*() {
  try {
    const lists: Array<List> = [{ items: [{ text: 'hello' }] }];
    yield sleep(500);
    yield put(fetchListsSuccess(lists));
  } catch (error) {
    yield put(fetchListsError(error));
  }
};
