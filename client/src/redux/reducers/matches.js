// @flow

import { GET_MATCHES, GET_MATCHES_FAILURE, GET_MATCHES_SUCCESS } from '../constants';
import type { MatchReducerState, MatchReducerAction } from '../../types/reducers/';

const initialState = {
  fetching: false,
  matches: [],
  error: null
};

export default (
  state: MatchReducerState = initialState, 
  { type, error, matches }: MatchReducerAction,
) : MatchReducerState => {

  switch (type) {
    case GET_MATCHES:
      return { ...state, fetching: true, error: null };
    case GET_MATCHES_SUCCESS:
      return { ...state, fetching: false, matches: matches };
    case GET_MATCHES_FAILURE:
      return { ...state, fetching: false, matches: [], error: error };
    default:
      return state;
  }
};
