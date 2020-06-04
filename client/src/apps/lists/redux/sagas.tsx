import {
  FETCH_LISTS,
  CREATE_LIST_ITEM,
  fetchListsSuccess,
  fetchListsError,
  createListItemSuccess,
  ListType,
  createListItemAction,
  fetchLists,
} from './index';
import { takeLatest, put } from 'redux-saga/effects';
import { showNotification } from '../../../redux/actions';

export default function*() {
  console.log('registering root list saga');

  yield takeLatest(FETCH_LISTS, fetchListsSaga);
  yield takeLatest(CREATE_LIST_ITEM, createListItemSaga);
}
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let todoList: ListType = {
  id: 0,
  items: [{ text: 'hello', id: 1 }, { text: 'hi', id: 2 }],
  name: 'Todo',
  order: 1,
};

const fetchListsSaga = function*() {
  try {
    const lists: Array<ListType> = [todoList];
    yield sleep(500);
    yield put(fetchListsSuccess(lists));
  } catch (error) {
    yield put(fetchListsError(error));
  }
};

const createListItemSaga = function*({ text }: createListItemAction) {
  yield sleep(500);
  todoList.items.push({ text, id: todoList.items.length + 1 });
  yield put(createListItemSuccess());
  yield put(showNotification('Item created successfully', 'success'));
  // reload
  yield put(fetchLists());
};
