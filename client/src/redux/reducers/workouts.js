import * as types from '../constants';

const initialState = {
  list: null,
  map: {},
  fetching: false,
  error: null,
  updating: false,
};

export default (
  state = initialState,
  { type, fetching, workouts, workout, error }
) => {
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
    case types.FETCH_WORKOUT_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        map: {
          ...state.map,
          [workout.id]: workout,
        },
      };
    case types.UPDATE_WORKOUT:
      return {
        ...state,
        updating: true,
        error: null,
      };
    case types.UPDATE_WORKOUT_SUCCESS:
      return {
        ...state,
        updating: false,
        error: null,
      };
    case types.UPDATE_WORKOUT_FAILURE:
      return {
        ...state,
        updating: false,
        error,
      };
    default:
      return state;
  }
};
