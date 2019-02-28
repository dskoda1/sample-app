import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import {
  showNotification,
  fetchWorkout,
  updateWorkout,
} from '../../redux/actions';
import DetailsHeader from './DetailsHeader';

class Details extends Component {
  componentDidMount() {
    this.props.fetchWorkout(this.props.id);
  }

  completeWorkout = () => {
    this.props.updateWorkout(this.props.id, { finished: true });
  };

  updateWorkoutName = (name) => {
    this.props.updateWorkout(this.props.id, { name });
  };

  render() {
    const { workout, updating } = this.props;
    let contents = <div>Loading..</div>
    if (workout) {
      contents =  <DetailsHeader
                    workout={this.props.workout}
                    updating={updating}
                    completeWorkout={this.completeWorkout}
                    updateWorkoutName={this.updateWorkoutName}
                  />
    }

    return (
      <Grid container justify="center">
        <Grid item sm={6} xs={12}>
          {contents}
        </Grid>
      </Grid>
    );
  }
}

Details.propTypes = {
  workout: PropTypes.shape({}),
  fetching: PropTypes.bool.isRequired,
  updating: PropTypes.bool.isRequired,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  showNotification: PropTypes.func.isRequired,
  fetchWorkout: PropTypes.func.isRequired,
  updateWorkout: PropTypes.func.isRequired,
};

const mapStateToProps = (
  state,
  {
    match: {
      params: { workoutId },
    },
  }
) => {
  return {
    id: workoutId,
    fetching: state.workouts.fetching,
    error: state.workouts.error,
    workout: state.workouts.map[workoutId],
    updating: state.workouts.updating,
  };
};
const mapDispatchToProps = {
  showNotification,
  fetchWorkout,
  updateWorkout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
