import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import NewWorkoutForm from './NewWorkoutForm';
import WorkoutList from './WorkoutList';

import { showNotification } from '../../../redux/actions';
import { fetchWorkouts, createWorkout } from '../../../redux/actions/workouts';

class WorkoutsHomePage extends Component {
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
    this.props.createWorkout(name, this.props.pushHistory);
  };

  render() {
    return (
      <div>
        <Typography variant="h3">Workouts</Typography>
        <Grid container justify="space-around">
          <Grid item xs={12} sm={6}>
            <NewWorkoutForm
              startNew={this.startNew}
              creating={this.props.creating}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
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
    creating: state.workouts.creating,
  };
};
const mapDispatchToProps = {
  showNotification,
  fetchWorkouts,
  createWorkout,
};

WorkoutsHomePage.propTypes = {
  // redux state props
  pushHistory: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  workouts: PropTypes.array,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.string,
  creating: PropTypes.bool.isRequired,
  // actions
  showNotification: PropTypes.func.isRequired,
  fetchWorkouts: PropTypes.func.isRequired,
  createWorkout: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutsHomePage);
