//@flow
import { 
    LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS,
    REGISTER, REGISTER_FAILURE, REGISTER_SUCCESS,
} from '../constants';

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
        case REGISTER:
            return { 
                ...state, 
                fetching: true, 
                error: null 
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return { 
                ...state, 
                fetching: false, 
                error: null, 
                user: user,
            };
        case REGISTER_FAILURE:
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