import {
  FETCH_LISTS,
  CREATE_LIST_ITEM,
  fetchListsSuccess,
  fetchListsError,
  createListItemSuccess,
  ListType,
  createListItemAction,
  fetchLists,
  createListItemError,
  completeListItemAction,
  completeListItemSuccess,
  completeListItemError,
  COMPLETE_LIST_ITEM,
} from './index';
import { takeLatest, put } from 'redux-saga/effects';
import { showNotification } from '../../../redux/actions';

export default function*() {
  console.log('registering root list saga');

  yield takeLatest(FETCH_LISTS, fetchListsSaga);
  yield takeLatest(CREATE_LIST_ITEM, createListItemSaga);
  yield takeLatest(COMPLETE_LIST_ITEM, completeListItemSaga);
}
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let todoList: ListType = {
  id: 0,
  items: [
    { text: 'hello', id: 1 },
    { text: 'hi', id: 2 },
    { text: 'ralph', id: 3 },
    { text: 'bob', id: 4 },
  ],
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
  try {
    yield sleep(500);
    todoList.items.push({ text, id: todoList.items.length + 1 });
    yield put(createListItemSuccess());
    yield put(showNotification('Item created successfully', 'success'));
    // reload
    yield put(fetchLists());
  } catch (error) {
    yield put(createListItemError(error));
  }
};

const completeListItemSaga = function*({ id }: completeListItemAction) {
  try {
    yield sleep(500);
    for (let item of todoList.items) {
      if (item.id === id) {
        item.completed = true;
      }
    }
    yield put(completeListItemSuccess());
    yield put(showNotification('Completed successfully'));
  } catch (error) {
    yield put(completeListItemError(error));
  }
};
