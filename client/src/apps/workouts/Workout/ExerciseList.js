import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

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
  render() {
    const {
      classes,
      workoutId,
      id,
      name,
      type,
      sets,
      pushHistory,
    } = this.props;

    let numberOfSets = 0;
    let setsString = 'Sets';
    if (sets && sets.length) {
      numberOfSets = sets.length;
      if (sets.length === 1) {
        setsString = 'Set';
      }
    }
    return (
      <Paper className={classes.root} elevation={1}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Typography variant="title">{name}</Typography>
          </Grid>
          <Grid item xs={4} className={classes.detail}>
            <Typography component="p">{type}</Typography>
          </Grid>
          <Grid item xs={4} className={classes.detail}>
            <Typography component="p">
              {numberOfSets} {setsString}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              onClick={() =>
                pushHistory(`/workouts/${workoutId}/exercises/${id}`)
              }
              aria-label="View"
            >
              <ArrowForwardIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
const styles = theme => ({
  root: {
    // ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
    textAlign: 'center',
  },
  detail: {
    marginTop: theme.spacing.unit * 2,
    textTransform: 'capitalize',
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
  sets: PropTypes.array,
  createdAt: PropTypes.string.isRequired,
  finishedAt: PropTypes.string,
  pushHistory: PropTypes.func.isRequired,
};
let StyledExerciseListItem = withRouter(withStyles(styles)(ExerciseListItem));