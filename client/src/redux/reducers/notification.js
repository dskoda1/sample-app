import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../constants';

const initialState = {
    notification: null,
    variant: 'info',
};

export default (
  state = initialState, { type, notification, variant }
) => {
    switch (type) {
        case SHOW_NOTIFICATION:
            return { 
                ...state,
                notification,
                variant
            };
        case HIDE_NOTIFICATION:
            return {
                notification: null
            }
        default:
            return state;
    }
};