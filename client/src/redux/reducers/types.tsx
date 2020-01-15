import { ListReducerState } from 'apps/lists/redux';
import { ActivityReducerState } from 'apps/activity/redux';

export interface AppState {
  auth: any;
  notification: any;
  listState: ListReducerState;
  activityState: ActivityReducerState;
}
