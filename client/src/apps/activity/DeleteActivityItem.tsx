import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import * as React from 'react';
import { createStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { deleteActivity } from './redux';
import { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import { AppState } from '../../redux/reducers/types';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  })
);

interface DeleteActivityItemProps {
  activityId: number;
}

const DeleteActivityItem: React.FunctionComponent<DeleteActivityItemProps> = ({
  activityId,
}) => {
  const classes = useStyles();
  const isDeleting = useSelector(
    (state: AppState) => state.activityState.deletingActivity
  );
  const [open, setDialogOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  return (
    <div>
      <IconButton
        className={classes.button}
        onClick={() => setDialogOpen(!open)}
        disabled={isDeleting}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setDialogOpen(false)}>
        <DialogTitle id="alert-dialog-title">{`Delete activity?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Confirm you would like to delete this activity. This action can not
            be reversed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="default">
            Cancel
          </Button>
          <Button
            onClick={() => dispatch(deleteActivity(activityId))}
            color="secondary"
            autoFocus
            disabled={isDeleting}
          >
            {isDeleting ? <CircularProgress size={22} /> : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteActivityItem;
