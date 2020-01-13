// Types
export const FETCH_ACTIVITY = 'FETCH_ACTIVITY';
export const FETCH_ACTIVITY_SUCCESS = 'FETCH_ACTIVITY_SUCCESS';
export const FETCH_ACTIVITY_ERROR = 'FETCH_ACTIVITY_ERROR';

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

export type ActivityActionTypes =
  | fetchActivityAction
  | fetchActivitySuccessAction
  | fetchActivityErrorAction;

// Actions
export const fetchActivity = (): ActivityActionTypes => {
  return {
    type: FETCH_ACTIVITY,
  };
};
export const fetchActivitySuccess = (
  activity: Array<Activity>,
  tags: Array<Tag>,
  activityTypes: Array<ActivityType>
): ActivityActionTypes => {
  return {
    type: FETCH_ACTIVITY_SUCCESS,
    activity,
    tags,
    activityTypes,
  };
};
export const fetchActivityError = (error: string): ActivityActionTypes => {
  return {
    type: FETCH_ACTIVITY_ERROR,
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
  createdAt: Date;
}
// Reducer
export interface ActivityReducerState {
  fetching?: boolean;
  error?: string;
  activity: Array<Activity>;
  tags: Array<Tag>;
  activityTypes: Array<ActivityType>;
}

const initialState: ActivityReducerState = {
  fetching: false,
  activity: [],
  tags: [],
  activityTypes: [],
};

export const ActivityReducer = (
  state = initialState,
  action: ActivityActionTypes
): ActivityReducerState => {
  console.log(`Got action with type ${action.type}`);
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
        error: action.error,
      };
    default:
      return state;
  }
};
