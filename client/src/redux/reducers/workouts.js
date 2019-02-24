import * as types from '../constants';

const initialState = {
  list: null,
  fetching: false,
  error: null,
};

export default (state = initialState, { type, fetching, workouts, error }) => {
  switch (type) {
    case types.FETCH_WORKOUT:
    case types.FETCH_WORKOUTS:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case types.FETCH_WORKOUTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        list: workouts,
      };
    default:
      return state;
  }
};
