import { ListReducerState } from 'apps/lists/redux';

export interface AppState {
  auth: any;
  notification: any;
  listState: ListReducerState;
}
