import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core';

class DeleteExercise extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleConfirm = () => {
    this.setState({ open: false });
    this.props.deleteExercise();
  };

  render() {
    const { deletingExercise, classes, exerciseName } = this.props;

    return (
      <div>
        <IconButton
          disabled={deletingExercise}
          className={classes.button}
          onClick={this.handleClickOpen}
        >
          <DeleteIcon />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`Delete exercise "${exerciseName}?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Confirm you would like to delete "{exerciseName}
              ". This action can not be reversed.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="default">
              Cancel
            </Button>
            <Button onClick={this.handleConfirm} color="secondary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DeleteExercise.propTypes = {
  deleteExercise: PropTypes.func.isRequired,
  deletingExercise: PropTypes.bool.isRequired,
  exerciseName: PropTypes.string.isRequired,
};

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

export default withStyles(styles)(DeleteExercise);
