import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';
import Moment from 'react-moment';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FastForwardIcon from '@material-ui/icons/FastForward';
import CheckCircleIcon from '@material-ui/icons/IndeterminateCheckBox';

export default class ExerciseList extends Component {
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
};

class ExerciseListItem extends Component {
  state = {
    isDeleting: false,
  };

  render() {
    const {
      classes,
      workoutId,
      id,
      name,
      type,
      createdAt,
      pushHistory,
    } = this.props;

    let deletingComponent = (
      <IconButton onClick={() => this.setState({ isDeleting: true })}>
        <DeleteIcon />
      </IconButton>
    );

    if (this.state.isDeleting) {
      deletingComponent = (
        <IconButton className={classes.error}>
          <CheckCircleIcon />
        </IconButton>
      );
    }

    return (
      <Paper className={classes.root} elevation={1}>
        <Grid container justify="flex-start">
          <Grid item xs={6}>
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
          <Grid item xs={4}>
            <Typography component="p">sets</Typography>
          </Grid>
          <Grid item xs={2}>
            {deletingComponent}
            <IconButton
              onClick={() =>
                pushHistory(`/workouts/${workoutId}/exercises/${id}`)
              }
              color="primary"
              aria-label="Add"
              className={classes.fab}
            >
              <FastForwardIcon />
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
  fab: {
    margin: theme.spacing.unit,
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
});

ExerciseListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  finishedAt: PropTypes.string,
  pushHistory: PropTypes.func.isRequired,
};
let StyledExerciseListItem = withRouter(withStyles(styles)(ExerciseListItem));
