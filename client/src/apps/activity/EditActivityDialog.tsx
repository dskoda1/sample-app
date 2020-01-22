import * as React from 'react';
import { createStyles } from '@material-ui/core';

import { Activity, FlatActivity } from './redux';
import EditIcon from '@material-ui/icons/Edit';
import { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import makeStyles from '@material-ui/core/styles/makeStyles';
// import { useDispatch } from 'react-redux';
import ActivityForm from './ActivityForm';
import Grid from '@material-ui/core/Grid';

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
  // const dispatch = useDispatch();

  const submitActivityUpdate = (activity: FlatActivity) => {
    setDialogOpen(false);
    console.log(activity);
  };

  return (
    <>
      <IconButton
        className={classes.button}
        onClick={() => setDialogOpen(!open)}
        // disabled={isDeleting}
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
                  activityTypeName: activityItem.ActivityType.name,
                  tagName: activityItem.Tag.name,
                  createdAt: activityItem.createdAt,
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
