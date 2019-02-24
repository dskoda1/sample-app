import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import NewWorkoutForm from './NewWorkoutForm';
import WorkoutList from './WorkoutList';

import { showNotification, fetchWorkouts } from '../../redux/actions';

const styles = theme => ({
  textField: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    marginTop: theme.spacing.unit * 4,
  },
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
});

const makePostRequest = (url, body) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

class Workouts extends Component {
  state = {
    creating: false,
  };

  componentDidUpdate() {
    if (!this.props.fetching && !this.props.workouts) {
      this.props.fetchWorkouts();
    }
  }

  componentDidMount() {
    this.props.fetchWorkouts();
  }

  startNew = name => {
    if (!name || name.length < 3) {
      this.props.showNotification('not a valid name', 'error');
      return;
    }
    // TODO: Redux-ify this
    this.setState({ creating: true }, () => {
      makePostRequest('/api/workouts', { name })
        .then(res => res.json())
        .then(workout => this.props.pushHistory(`/workouts/${workout.id}`))
        // .then(() => this.setState({ creatingWorkout: false }))
        .then(() =>
          this.props.showNotification(
            'Workout created successfully!',
            'success'
          )
        )
        .then(() => this.props.fetchWorkouts())
        .catch(error => console.error(error));
    });
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <Typography variant="display3">Workouts</Typography>
        <Grid container justify="space-around">
          <Grid item xs={12} md={6}>
            <NewWorkoutForm
              classes={this.props.classes}
              startNew={this.startNew}
              creating={this.state.creating}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <WorkoutList
              workouts={this.props.workouts ? this.props.workouts : []}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, router) => {
  return {
    pushHistory: router.history.push,
    loggedIn: state.auth.loggedIn,
    workouts: state.workouts.list,
    fetching: state.workouts.fetching,
    error: state.workouts.error,
  };
};
const mapDispatchToProps = {
  showNotification,
  fetchWorkouts,
};

Workouts.propTypes = {
  // redux state props
  pushHistory: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  workouts: PropTypes.array,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.string,
  // actions
  showNotification: PropTypes.func.isRequired,
  fetchWorkouts: PropTypes.func.isRequired,
  // material
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Workouts));
