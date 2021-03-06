// Types
export const FETCH_ACTIVITY = 'FETCH_ACTIVITY';
export const FETCH_ACTIVITY_SUCCESS = 'FETCH_ACTIVITY_SUCCESS';
export const FETCH_ACTIVITY_ERROR = 'FETCH_ACTIVITY_ERROR';

export const POST_ACTIVITY = 'POST_ACTIVITY';
export const POST_ACTIVITY_SUCCESS = 'POST_ACTIVITY_SUCCESS';
export const POST_ACTIVITY_ERROR = 'POST_ACTIVITY_ERROR';

export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const DELETE_ACTIVITY_SUCCESS = 'DELETE_ACTIVITY_SUCCESS';
export const DELETE_ACTIVITY_ERROR = 'DELETE_ACTIVITY_ERROR';

export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';
export const UPDATE_ACTIVITY_SUCCESS = 'UPDATE_ACTIVITY_SUCCESS';
export const UPDATE_ACTIVITY_ERROR = 'UPDATE_ACTIVITY_ERROR';

interface fetchActivityAction {
  type: typeof FETCH_ACTIVITY;
}
interface fetchActivitySuccessAction {
  type: typeof FETCH_ACTIVITY_SUCCESS;
  tags: Array<Tag>;
  activityTypes: Array<ActivityType>;
  activity: Array<Activity>;
}
interface fetchActivityErrorAction {
  type: typeof FETCH_ACTIVITY_ERROR;
  error: string;
}

export interface postActivityAction {
  type: typeof POST_ACTIVITY;
  activityTypeName: string;
  tagName: string;
  timestamp?: string;
  duration?: number;
  // TODO: Add note
}

interface postActivitySuccessAction {
  type: typeof POST_ACTIVITY_SUCCESS;
}

interface postActivityErrorAction {
  type: typeof POST_ACTIVITY_ERROR;
  error: string;
}

export interface deleteActivityAction {
  type: typeof DELETE_ACTIVITY;
  activityId: number;
}

interface deleteActivitySuccess {
  type: typeof DELETE_ACTIVITY_SUCCESS;
}

interface deleteActivityError {
  type: typeof DELETE_ACTIVITY_ERROR;
  error: string;
}

export interface updateActivityAction {
  type: typeof UPDATE_ACTIVITY;
  id: number;
  activityTypeName: string;
  tagName: string;
  timestamp?: string;
  duration?: number;
  // TODO: Add note
}

interface updateActivitySuccessAction {
  type: typeof UPDATE_ACTIVITY_SUCCESS;
}

interface updateActivityErrorAction {
  type: typeof UPDATE_ACTIVITY_ERROR;
  error: string;
}

export type ActivityActionTypes =
  | fetchActivityAction
  | fetchActivitySuccessAction
  | fetchActivityErrorAction
  | postActivityAction
  | postActivitySuccessAction
  | postActivityErrorAction
  | deleteActivityAction
  | deleteActivitySuccess
  | deleteActivityError
  | updateActivityAction
  | updateActivitySuccessAction
  | updateActivityErrorAction;

// Actions
export const fetchActivity = (): fetchActivityAction => {
  return {
    type: FETCH_ACTIVITY,
  };
};
export const fetchActivitySuccess = (
  activity: Array<Activity>,
  tags: Array<Tag>,
  activityTypes: Array<ActivityType>
): fetchActivitySuccessAction => {
  return {
    type: FETCH_ACTIVITY_SUCCESS,
    activity,
    tags,
    activityTypes,
  };
};
export const fetchActivityError = (error: string): fetchActivityErrorAction => {
  return {
    type: FETCH_ACTIVITY_ERROR,
    error,
  };
};
export const postActivity = (
  activityTypeName: string,
  tagName: string,
  timestamp: string,
  duration: number
): postActivityAction => {
  return {
    type: POST_ACTIVITY,
    activityTypeName,
    tagName,
    timestamp,
    duration,
  };
};
export const postActivitySuccess = (): postActivitySuccessAction => {
  return {
    type: POST_ACTIVITY_SUCCESS,
  };
};
export const postActivityError = (error: string): postActivityErrorAction => {
  return {
    type: POST_ACTIVITY_ERROR,
    error,
  };
};

export const deleteActivity = (activityId: number): deleteActivityAction => {
  return {
    type: DELETE_ACTIVITY,
    activityId,
  };
};

export const deleteActivitySuccess = (): deleteActivitySuccess => {
  return {
    type: DELETE_ACTIVITY_SUCCESS,
  };
};

export const deleteActivityError = (error: string): deleteActivityError => {
  return {
    type: DELETE_ACTIVITY_ERROR,
    error,
  };
};

export const updateActivity = (
  id: number,
  activityTypeName: string,
  tagName: string,
  timestamp: string,
  duration: number
): updateActivityAction => {
  return {
    type: UPDATE_ACTIVITY,
    id,
    activityTypeName,
    tagName,
    timestamp,
    duration,
  };
};
export const updateActivitySuccess = (): updateActivitySuccessAction => {
  return {
    type: UPDATE_ACTIVITY_SUCCESS,
  };
};
export const updateActivityError = (
  error: string
): updateActivityErrorAction => {
  return {
    type: UPDATE_ACTIVITY_ERROR,
    error,
  };
};

// Models
export interface ActivityType {
  id: number;
  name: string;
  createdAt?: Date;
}

export interface Tag {
  id: number;
  name: string;
  forTable: string;
}

export interface Activity {
  id: number;
  ActivityType: ActivityType;
  Tag: Tag;
  createdAt: string;
  timestamp: string;
  duration: number;
}

export interface FlatActivity {
  id?: number;
  activityTypeName: string;
  tagName: string;
  duration: number;
  timestamp: string;
}

// Reducer
export interface ActivityReducerState {
  fetching?: boolean;
  fetchingError?: string;
  postingActivity?: boolean;
  postingActivityError?: string;
  deletingActivity?: boolean;
  deletingActivityError?: string;
  updatingActivity?: boolean;
  updatingActivityError?: string;
  activity: Array<Activity>;
  tags: Array<Tag>;
  activityTypes: Array<ActivityType>;
}

const initialState: ActivityReducerState = {
  activity: [],
  tags: [],
  activityTypes: [],
};

export const ActivityReducer = (
  state = initialState,
  action: ActivityActionTypes
): ActivityReducerState => {
  switch (action.type) {
    case FETCH_ACTIVITY:
      return {
        ...state,
        fetching: true,
        activity: [],
      };
    case FETCH_ACTIVITY_SUCCESS:
      return {
        ...state,
        fetching: false,
        activity: action.activity,
        tags: action.tags,
        activityTypes: action.activityTypes,
      };
    case FETCH_ACTIVITY_ERROR:
      return {
        ...state,
        fetching: false,
        fetchingError: action.error,
      };
    case POST_ACTIVITY:
      return {
        ...state,
        postingActivity: true,
        postingActivityError: undefined,
      };
    case POST_ACTIVITY_SUCCESS:
      return {
        ...state,
        postingActivity: false,
        postingActivityError: undefined,
      };
    case POST_ACTIVITY_ERROR:
      return {
        ...state,
        postingActivity: false,
        postingActivityError: action.error,
      };
    case DELETE_ACTIVITY:
      return {
        ...state,
        deletingActivity: true,
        deletingActivityError: undefined,
      };
    case DELETE_ACTIVITY_SUCCESS:
      return {
        ...state,
        deletingActivity: false,
        deletingActivityError: undefined,
      };
    case DELETE_ACTIVITY_ERROR:
      return {
        ...state,
        deletingActivity: false,
        deletingActivityError: action.error,
      };
    case UPDATE_ACTIVITY:
      return {
        ...state,
        updatingActivity: true,
        updatingActivityError: undefined,
      };
    case UPDATE_ACTIVITY_SUCCESS:
      return {
        ...state,
        updatingActivity: false,
        updatingActivityError: undefined,
      };
    case UPDATE_ACTIVITY_ERROR:
      return {
        ...state,
        updatingActivity: false,
        updatingActivityError: action.error,
      };
    default:
      return state;
  }
};
