import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

// import Grid from '@material-ui/core/Grid';
import { showNotification } from '../../redux/actions';
import { fetchWorkout } from '../../redux/actions/workouts';
class ExercisePage extends Component {
  componentDidMount() {
    this.props.fetchWorkout(this.props.workoutId);
  }

  render() {
    return (
      <div>
        {this.props.workoutId} - {this.props.exerciseId}
      </div>
    );
  }
}

ExercisePage.propTypes = {
  workoutId: PropTypes.string.isRequired,
  exerciseId: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.string,
  workout: PropTypes.object.isRequired,
  goBack: PropTypes.func.isRequired,
};

const mapStateToProps = (state, router) => {
  return {
    workoutId: router.match.params.workoutId,
    exerciseId: router.match.params.exerciseId,
    fetching: state.workouts.fetching,
    error: state.workouts.error,
    workout: state.workouts.map[router.match.params.workoutId],
    // creatingSet: state.sets.creating,
    // deletingSet: state.sets.deleting,
    goBack: router.history.goBack,
  };
};
const mapDispatchToProps = {
  showNotification,
  fetchWorkout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExercisePage);
