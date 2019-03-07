import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';
import Moment from 'react-moment';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ClearIcon from '@material-ui/icons/Clear';
import CheckCircleIcon from '@material-ui/icons/IndeterminateCheckBox';

import green from '@material-ui/core/colors/green';

export default class ExerciseList extends Component {
  state = {
    deleting: null,
  };

  startDelete = id => {
    this.setState({
      deleting: id,
    });
  };

  confirmDelete = () => {
    this.props.deleteExercise(this.props.workoutId, this.state.deleting);
  };

  cancelDelete = () => {
    this.setState({
      deleting: null,
    });
  };

  render() {
    if (!this.props.exercises) {
      return <div>loading...</div>;
    }
    return (
      <div>
        {this.props.exercises.map(exercise => {
          return (
            <StyledExerciseListItem
              key={exercise.id}
              {...exercise}
              workoutId={this.props.workoutId}
              pushHistory={this.props.pushHistory}
              deleting={exercise.id === this.state.deleting}
              deleteDisabled={this.props.deletingExercise}
              startDelete={this.startDelete}
              confirmDelete={this.confirmDelete}
              cancelDelete={this.cancelDelete}
            />
          );
        })}
      </div>
    );
  }
}

ExerciseList.propTypes = {
  exercises: PropTypes.array.isRequired,
  workoutId: PropTypes.number.isRequired,
  pushHistory: PropTypes.func.isRequired,
  deletingExercise: PropTypes.bool.isRequired,
};

class ExerciseListItem extends Component {
  render() {
    const {
      classes,
      workoutId,
      id,
      name,
      type,
      createdAt,
      pushHistory,
      deleting,
      startDelete,
      confirmDelete,
      cancelDelete,
      deleteDisabled,
    } = this.props;

    let deletingComponent = (
      <IconButton className={classes.button} onClick={() => startDelete(id)}>
        <DeleteIcon />
      </IconButton>
    );

    if (deleting) {
      deletingComponent = (
        <div>
          <IconButton
            className={classes.error}
            onClick={() => confirmDelete()}
            disabled={deleteDisabled}
          >
            <CheckCircleIcon />
          </IconButton>
          <IconButton onClick={() => cancelDelete()} className={classes.button}>
            <ClearIcon />
          </IconButton>
        </div>
      );
    }

    return (
      <Paper className={classes.root} elevation={1}>
        <Grid container justify="flex-start">
          <Grid item xs={5} md={6}>
            <Grid
              container
              justify="space-between"
              direction="column"
              alignItems="center"
            >
              <Grid item>
                <Typography>{type}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="display1">{name}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3} md={4}>
            <Typography component="p">sets</Typography>
          </Grid>
          <Grid item xs={2} md={1}>
            {deletingComponent}
          </Grid>
          <Grid item xs={2} md={1}>
            <IconButton
              onClick={() =>
                pushHistory(`/workouts/${workoutId}/exercises/${id}`)
              }
              aria-label="Add"
              className={classes.button}
              color="primary"
            >
              <AddCircleIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  error: {
    margin: theme.spacing.unit,
    color: theme.palette.error.dark,
  },
});

ExerciseListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  finishedAt: PropTypes.string,
  pushHistory: PropTypes.func.isRequired,
  deleting: PropTypes.bool.isRequired,
  startDelete: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
};
let StyledExerciseListItem = withRouter(withStyles(styles)(ExerciseListItem));
