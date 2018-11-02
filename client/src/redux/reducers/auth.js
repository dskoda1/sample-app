import { 
    LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS,
    REGISTER, REGISTER_FAILURE, REGISTER_SUCCESS,
    FETCH_PROFILE, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE,
    LOGOUT_SUCCESS
} from '../constants';

const initialState = {
    fetching: false,
    user: null,
    error: null,
    loggedIn: false,
};

export default (
  state = initialState, { type, fetching, user, error }
) => {
    switch (type) {
        case LOGIN:
        case REGISTER:
        case FETCH_PROFILE:
            return { 
                ...state, 
                fetching: true, 
                error: null,
                loggedIn: false,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case FETCH_PROFILE_SUCCESS:
            return { 
                ...state, 
                fetching: false, 
                error: null, 
                user: user,
                loggedIn: true,
            };
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case FETCH_PROFILE_FAILURE:
            return { 
                ...state, 
                fetching: false, 
                error: error, 
                user: null,
                loggedIn: false,
            };
        case LOGOUT_SUCCESS:
        return {
            ...state,
            fetching: false,
            error: null,
            user: null,
            loggedIn: false,
        }
        default:
            return state;
    }
};