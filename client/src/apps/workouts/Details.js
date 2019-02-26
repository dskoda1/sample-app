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

  render() {
    const { workout, updating } = this.props;
    if (!workout) {
      return <span>Loading..</span>;
    }

    return (
      <Grid container justify="center">
        <Grid item sm={6} xs={12}>
          <DetailsHeader
            workout={this.props.workout}
            updating={updating}
            completeWorkout={this.completeWorkout}
          />
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
