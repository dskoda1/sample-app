import * as types from './constants';

const initialState = {
  list: null,
  fetching: false,
  error: null,
};

export default (state = initialState, { type, fetching, inventory, error }) => {
  switch (type) {
    case types.FETCH_INVENTORY:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case types.FETCH_INVENTORY_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        list: inventory,
      };
    case types.FETCH_INVENTORY_FAILURE:
      return {
        ...state,
        fetching: false,
        error,
      };
    default:
      return state;
  }
};
