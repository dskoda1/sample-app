import * as types from './constants';

/** Fetch Inventory */
export const fetchInventory = () => ({ type: types.FETCH_INVENTORY });
export const fetchInventorySuccess = inventory => ({
  type: types.FETCH_INVENTORY_SUCCESS,
  inventory,
});
export const fetchInventoryFailure = error => ({
  type: types.FETCH_INVENTORY_FAILURE,
  error,
});
