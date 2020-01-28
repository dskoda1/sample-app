import * as React from 'react';
import { createStyles } from '@material-ui/core';

import { Activity, FlatActivity, updateActivity } from './redux';
import EditIcon from '@material-ui/icons/Edit';
import { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import ActivityForm from './ActivityForm';
import { AppState } from '../../redux/reducers/types';

const useStyles = makeStyles(theme =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  })
);

interface ActivityItemProps {
  activityItem: Activity;
}

const EditActivityDialog: React.FunctionComponent<ActivityItemProps> = ({
  activityItem,
}) => {
  const { updatingActivity } = useSelector(
    (state: AppState) => state.activityState
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setDialogOpen] = useState<boolean>(false);
  const [isUpdating, setStateUpdating] = useState<boolean | undefined>(
    updatingActivity
  );

  useEffect(() => {
    if (isUpdating && !updatingActivity) {
      setDialogOpen(false);
    }
    setStateUpdating(updatingActivity);
  }, [isUpdating, setStateUpdating, updatingActivity, setDialogOpen]);

  const submitActivityUpdate = (activity: FlatActivity) => {
    dispatch(
      updateActivity(
        activity.id as number,
        activity.activityTypeName,
        activity.tagName,
        activity.timestamp,
        activity.duration
      )
    );
  };

  return (
    <div>
      <IconButton
        className={classes.button}
        onClick={() => setDialogOpen(true)}
        disabled={updatingActivity}
      >
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setDialogOpen(false)}>
        <DialogTitle id="alert-dialog-title">Edit Activity</DialogTitle>
        <DialogContent>
          <ActivityForm
            submitActivity={submitActivityUpdate}
            item={{
              id: activityItem.id,
              activityTypeName: activityItem.ActivityType.name,
              tagName: activityItem.Tag.name,
              timestamp: activityItem.timestamp,
              duration: activityItem.duration,
            }}
            disableSubmit={updatingActivity}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditActivityDialog;
