import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Moment from 'react-moment';

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
    let timeSinceLastSetComponent = null;

    if (sets && sets.length) {
      numberOfSets = sets.length;
      if (sets.length === 1) {
        setsString = 'Set';
      }
      let sortedSets = sets.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
      });
      timeSinceLastSetComponent = (
        <Moment
          durationFromNow
          date={sortedSets[0].createdAt}
          interval={1000}
        />
      );
    }
    return (
      <Paper className={classes.root} elevation={1}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Typography variant="h6">{name}</Typography>
          </Grid>
          <Grid item xs={4} className={classes.detail}>
            <Typography component="p">{type}</Typography>
          </Grid>
          <Grid item xs={4} className={classes.detail}>
            <Typography component="p">
              {numberOfSets} {setsString}{' '}
              {timeSinceLastSetComponent ? ' - Last ' : null}{' '}
              {timeSinceLastSetComponent}
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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
    textAlign: 'center',
  },
  detail: {
    marginTop: theme.spacing(2),
    textTransform: 'capitalize',
  },
  error: {
    margin: theme.spacing(1),
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
