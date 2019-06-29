import { call, put } from 'redux-saga/effects';

import * as actions from './actions';
import { showNotification } from '../actions';
import api from './api';

const fetchInventorySaga = function*() {
  try {
    const response = yield call(api.fetchInventory);
    yield put(actions.fetchInventorySuccess(response.data.inventory));
  } catch (error) {
    yield put(
      showNotification('Failed to fetch your inventory, sorry!', 'error')
    );
    yield put(actions.fetchInventoryFailure(error));
  }
};

export { fetchInventorySaga };
