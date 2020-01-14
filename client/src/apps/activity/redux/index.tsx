// Types
export const FETCH_ACTIVITY = 'FETCH_ACTIVITY';
export const FETCH_ACTIVITY_SUCCESS = 'FETCH_ACTIVITY_SUCCESS';
export const FETCH_ACTIVITY_ERROR = 'FETCH_ACTIVITY_ERROR';

export const POST_ACTIVITY = 'POST_ACTIVITY';
export const POST_ACTIVITY_SUCCESS = 'POST_ACTIVITY_SUCCESS';
export const POST_ACTIVITY_ERROR = 'POST_ACTIVITY_ERROR';

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
}

interface postActivitySuccessAction {
  type: typeof POST_ACTIVITY_SUCCESS;
}

interface postActivityErrorAction {
  type: typeof POST_ACTIVITY_ERROR;
  error: string;
}

export type ActivityActionTypes =
  | fetchActivityAction
  | fetchActivitySuccessAction
  | fetchActivityErrorAction
  | postActivityAction
  | postActivitySuccessAction
  | postActivityErrorAction;

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
  tagName: string
): postActivityAction => {
  return {
    type: POST_ACTIVITY,
    activityTypeName,
    tagName,
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
}
// Reducer
export interface ActivityReducerState {
  fetching?: boolean;
  fetchingError?: string;
  postingActivity?: boolean;
  postingActivityError?: string;
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
        tags: [],
        activityTypes: [],
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
      };
    case POST_ACTIVITY_ERROR:
      return {
        ...state,
        postingActivity: false,
        postingActivityError: action.error,
      };
    default:
      return state;
  }
};
