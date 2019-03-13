import * as types from '../constants';

const initialState = {
  creating: false,
  error: null,
  deleting: false,
};

export default (state = initialState, { type, error }) => {
  switch (type) {
    case types.CREATE_EXERCISE:
      return {
        ...state,
        creating: true,
        error: null,
      };
    case types.CREATE_EXERCISE_SUCCESS:
      return {
        ...state,
        creating: false,
        error: null,
      };
    case types.CREATE_EXERCISE_FAILURE:
      return {
        ...state,
        creating: false,
        error,
      };
    case types.DELETE_EXERCISE:
      return {
        ...state,
        deleting: true,
        error: null,
      };
    case types.DELETE_EXERCISE_SUCCESS:
      return {
        ...state,
        deleting: false,
        error: null,
      };
    case types.DELETE_EXERCISE_FAILURE:
      return {
        ...state,
        deleting: false,
        error,
      };
    default:
      return state;
  }
};

export const sets = (state = initialState, { type, error }) => {
  switch (type) {
    case types.CREATE_SET:
      return {
        ...state,
        creating: true,
        error: null,
      };
    case types.CREATE_SET_SUCCESS:
      return {
        ...state,
        creating: false,
        error: null,
      };
    case types.CREATE_SET_FAILURE:
      return {
        ...state,
        creating: false,
        error,
      };
    case types.DELETE_SET:
      return {
        ...state,
        deleting: true,
        error: null,
      };
    case types.DELETE_SET_SUCCESS:
      return {
        ...state,
        deleting: false,
        error: null,
      };
    case types.DELETE_SET_FAILURE:
      return {
        ...state,
        deleting: false,
        error,
      };
    default:
      return state;
  }
};
