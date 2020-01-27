import * as React from 'react';
import { createStyles } from '@material-ui/core';

import { Activity, FlatActivity, updateActivity } from './redux';
import EditIcon from '@material-ui/icons/Edit';
import { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import ActivityForm from './ActivityForm';
import Grid from '@material-ui/core/Grid';
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
  const [open, setDialogOpen] = useState<boolean>(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const activityState = useSelector((state: AppState) => state.activityState);

  const submitActivityUpdate = (activity: FlatActivity) => {
    setDialogOpen(false);
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
    <>
      <IconButton
        className={classes.button}
        onClick={() => setDialogOpen(!open)}
        disabled={activityState.updatingActivity}
      >
        <EditIcon />
      </IconButton>
      <Grid container justify={'space-around'}>
        <Dialog open={open} onClose={() => setDialogOpen(false)}>
          <DialogTitle id="alert-dialog-title">{`Edit Activity`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <ActivityForm
                submitActivity={submitActivityUpdate}
                item={{
                  id: activityItem.id,
                  activityTypeName: activityItem.ActivityType.name,
                  tagName: activityItem.Tag.name,
                  timestamp: activityItem.timestamp,
                  duration: activityItem.duration,
                }}
              />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Grid>
    </>
  );
};

export default EditActivityDialog;
