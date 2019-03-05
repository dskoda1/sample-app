import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';
import Moment from 'react-moment';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

export default class WorkoutList extends Component {
  render() {
    if (!this.props.workouts) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <h4>Your workouts</h4>
        {this.props.workouts.map(workout => {
          return <StyledWorkoutListItem key={workout.id} {...workout} />;
        })}
      </div>
    );
  }
}

WorkoutList.propTypes = {
  workouts: PropTypes.array.isRequired,
};

class WorkoutListItem extends Component {
  render() {
    const {
      classes,
      id,
      name,
      createdAt,
      history: { push },
      finishedAt,
    } = this.props;

    let FinishedComponent = <span>In Progress</span>;
    if (finishedAt) {
      FinishedComponent = (
        <span>
          <Moment diff={createdAt} unit="minutes">
            {finishedAt}
          </Moment>
          &nbsp;Minutes
        </span>
      );
    }

    return (
      <Paper
        onClick={() => push(`/workouts/${id}`)}
        className={classes.root}
        elevation={1}
      >
        <Grid container justify="flex-start">
          <Grid item xs={4}>
            <Typography variant="title">{name}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography component="p">
              <Moment format="MMM DD hh:m">{createdAt}</Moment>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography component="p">{FinishedComponent}</Typography>
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
    marginBottom: theme.spacing.unit,
    textAlign: 'center',
  },
});

WorkoutListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  finishedAt: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
let StyledWorkoutListItem = withRouter(withStyles(styles)(WorkoutListItem));
