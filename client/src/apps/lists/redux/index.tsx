// Types
export const FETCH_LISTS = 'FETCH_LISTS';
export const FETCH_LISTS_SUCCESS = 'FETCH_LISTS_SUCCESS';
export const FETCH_LISTS_ERROR = 'FETCH_LISTS_ERROR';

interface fetchListsAction {
  type: typeof FETCH_LISTS;
}
interface fetchListsSuccess {
  type: typeof FETCH_LISTS_SUCCESS;
  lists: Array<ListType>;
}
interface fetchListsError {
  type: typeof FETCH_LISTS_ERROR;
  error: string;
}

export type ListActionTypes =
  | fetchListsAction
  | fetchListsSuccess
  | fetchListsError;

// Actions
export const fetchLists = (): ListActionTypes => {
  return {
    type: FETCH_LISTS,
  };
};
export const fetchListsSuccess = (lists: Array<ListType>): ListActionTypes => {
  return {
    type: FETCH_LISTS_SUCCESS,
    lists,
  };
};
export const fetchListsError = (error: string): ListActionTypes => {
  return {
    type: FETCH_LISTS_ERROR,
    error,
  };
};

// Models
export interface ListItemType {
  id?: string;
  text: string;
  createdAt?: Date;
  isDeleted?: boolean;
  rank?: number;
}

export interface ListType {
  items: Array<ListItemType>;
  name: string;
  order: number;
  id: number;
}

// Reducer
export interface ListReducerState {
  fetching?: boolean;
  lists: Array<ListType>;
  fetchingError?: string;
  creatingList?: boolean;
  creatingListError?: string;
  creatingItem?: boolean;
  creatingItemError?: string;
  deletingItem?: boolean;
  deletingItemError?: string;
}

const initialState: ListReducerState = {
  lists: [],
};

export const ListReducer = (
  state = initialState,
  action: ListActionTypes
): ListReducerState => {
  switch (action.type) {
    case FETCH_LISTS:
      return {
        ...state,
        fetching: true,
        fetchingError: '',
      };
    case FETCH_LISTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        lists: action.lists,
      };
    case FETCH_LISTS_ERROR:
      return {
        ...state,
        fetching: false,
        fetchingError: action.error,
        lists: [],
      };
    default:
      return state;
  }
};
