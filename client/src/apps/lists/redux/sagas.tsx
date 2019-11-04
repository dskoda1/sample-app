import {
  FETCH_LISTS,
  fetchListsSuccess,
  ListType,
  ListItemType,
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
    const todoList: ListType = {
      id: 10,
      items: [{ text: 'hello' }, { text: 'hi' }],
      name: 'Todo',
      order: 1,
    };
    const lists: Array<ListType> = [todoList];
    yield sleep(500);
    yield put(fetchListsSuccess(lists));
  } catch (error) {
    yield put(fetchListsError(error));
  }
};
