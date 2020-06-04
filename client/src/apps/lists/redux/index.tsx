// Types
export const FETCH_LISTS = 'FETCH_LISTS';
export const FETCH_LISTS_SUCCESS = 'FETCH_LISTS_SUCCESS';
export const FETCH_LISTS_ERROR = 'FETCH_LISTS_ERROR';

export const CREATE_LIST_ITEM = 'CREATE_LIST_ITEM';
export const CREATE_LIST_ITEM_SUCCESS = 'CREATE_LIST_ITEM_SUCCESS';
export const CREATE_LIST_ITEM_ERROR = 'CREATE_LIST_ITEM_ERROR';

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

export interface createListItemAction {
  type: typeof CREATE_LIST_ITEM;
  text: string;
  order?: string;
}

interface createListItemSuccessAction {
  type: typeof CREATE_LIST_ITEM_SUCCESS;
}

interface createListItemErrorAction {
  type: typeof CREATE_LIST_ITEM_ERROR;
  error: string;
}

export type ListActionTypes =
  | fetchListsAction
  | fetchListsSuccess
  | fetchListsError
  | createListItemAction
  | createListItemSuccessAction
  | createListItemErrorAction;

// Actions
export const fetchLists = (): fetchListsAction => {
  return {
    type: FETCH_LISTS,
  };
};
export const fetchListsSuccess = (
  lists: Array<ListType>
): fetchListsSuccess => {
  return {
    type: FETCH_LISTS_SUCCESS,
    lists,
  };
};
export const fetchListsError = (error: string): fetchListsError => {
  return {
    type: FETCH_LISTS_ERROR,
    error,
  };
};

export const createListItem = (text: string): createListItemAction => {
  return {
    type: CREATE_LIST_ITEM,
    text,
  };
};

export const createListItemSuccess = (): createListItemSuccessAction => {
  return {
    type: CREATE_LIST_ITEM_SUCCESS,
  };
};

export const createListItemError = (
  error: string
): createListItemErrorAction => {
  return {
    type: CREATE_LIST_ITEM_ERROR,
    error,
  };
};

// Models
export interface ListType {
  items: Array<ListItemType>;
  name: string;
  order: number;
  id: number;
}

export interface ListItemType {
  id: number;
  text: string;
  createdAt?: Date;
  completed?: boolean;
  order?: number;
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
    case CREATE_LIST_ITEM:
      return {
        ...state,
        creatingItem: true,
        creatingItemError: undefined,
      };
    case CREATE_LIST_ITEM_SUCCESS:
      return {
        ...state,
        creatingItem: false,
        creatingItemError: undefined,
      };
    case CREATE_LIST_ITEM_ERROR:
      return {
        ...state,
        creatingItem: false,
        creatingItemError: action.error,
      };
    default:
      return state;
  }
};
