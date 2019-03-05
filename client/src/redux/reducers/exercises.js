import * as types from '../constants';

const initialState = {
  creating: false,
  error: null,
};

export default (state = initialState, { type, error }) => {
  switch (type) {
    case types.CREATE_EXERCISE:
      return {
        creating: true,
        error: null,
      };
    case types.CREATE_EXERCISE_SUCCESS:
      return {
        creating: false,
        error: null,
      };
    case types.CREATE_EXERCISE_FAILURE:
      return {
        creating: false,
        error,
      };
    default:
      return state;
  }
};
