//@flow
import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS } from '../constants';

const initialState = {
    fetching: false,
    user: null,
    error: null,
};

export default (
  state = initialState, { type, fetching, user, error }
) => {
    switch (type) {
        case LOGIN:
            return { 
                ...state, 
                fetching: true, 
                error: null 
            };
        case LOGIN_SUCCESS:
            return { 
                ...state, 
                fetching: false, 
                error: null, 
                user: user,
            };
        case LOGIN_FAILURE:
            return { 
                ...state, 
                fetching: false, 
                error: error, 
                user: null,
            };
        default:
            return state;
    }
};