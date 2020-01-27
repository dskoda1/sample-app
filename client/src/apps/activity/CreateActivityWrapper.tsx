import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'redux/reducers/types';
import { FlatActivity, postActivity } from './redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import ActivityForm from './ActivityForm';

interface CreateActivityWrapperProps {}

const CreateActivityWrapper: React.FunctionComponent<
  CreateActivityWrapperProps
> = () => {
  const activityState = useSelector((state: AppState) => state.activityState);
  const dispatch = useDispatch();
  if (activityState.postingActivity) {
    return <CircularProgress size={50} />;
  }
  const newActivity: FlatActivity = {
    id: 0,
    activityTypeName: '',
    tagName: '',
    duration: 0,
    timestamp: '',
  };

  return (
    <ActivityForm
      item={newActivity}
      submitActivity={item =>
        dispatch(
          postActivity(
            item.activityTypeName,
            item.tagName,
            item.timestamp,
            item.duration
          )
        )
      }
    />
  );
};

export default CreateActivityWrapper;
