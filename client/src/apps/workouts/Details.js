import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import DetailsHeader from './DetailsHeader';
import { showNotification } from '../../redux/actions';
import {
  fetchWorkout,
  updateWorkout,
  createExercise,
  deleteExercise,
} from '../../redux/actions/workouts';
import NewExerciseForm from './NewExerciseForm';
import ExerciseList from './ExerciseList';

class Details extends Component {
  componentDidMount() {
    this.props.fetchWorkout(this.props.id);
  }

  completeWorkout = () => {
    this.props.updateWorkout(this.props.id, { finished: true });
  };

  updateWorkoutName = name => {
    this.props.updateWorkout(this.props.id, { name });
  };

  createExercise = (name, type) => {
    this.props.createExercise(
      this.props.id,
      name,
      type,
      this.props.pushHistory
    );
  };

  render() {
    const {
      workout,
      updating,
      creatingExercise,
      pushHistory,
      deleteExercise,
      deletingExercise,
    } = this.props;
    let contents = <div>Loading..</div>;
    if (workout) {
      contents = (
        <div>
          <DetailsHeader
            workout={this.props.workout}
            updating={updating}
            completeWorkout={this.completeWorkout}
            updateWorkoutName={this.updateWorkoutName}
            goBack={this.props.goBack}
          />
          {workout.finishedAt ? null : (
            <NewExerciseForm
              creating={creatingExercise}
              onCreate={this.createExercise}
            />
          )}
          <ExerciseList
            exercises={workout.exercises}
            workoutId={workout.id}
            pushHistory={pushHistory}
            deleteExercise={deleteExercise}
            deletingExercise={deletingExercise}
          />
        </div>
      );
    }

    return (
      <Grid container justify="space-around">
        <Grid item sm={9} xs={12}>
          {contents}
        </Grid>
      </Grid>
    );
  }
}

Details.propTypes = {
  workout: PropTypes.shape({
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    finishedAt: PropTypes.string,
    exercises: PropTypes.array.isRequired,
  }),
  fetching: PropTypes.bool.isRequired,
  updating: PropTypes.bool.isRequired,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  showNotification: PropTypes.func.isRequired,
  fetchWorkout: PropTypes.func.isRequired,
  updateWorkout: PropTypes.func.isRequired,
  createExercise: PropTypes.func.isRequired,
  deleteExercise: PropTypes.func.isRequired,
  creatingExercise: PropTypes.bool.isRequired,
  deletingExercise: PropTypes.bool.isRequired,
  pushHistory: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

const mapStateToProps = (state, router) => {
  return {
    id: router.match.params.workoutId,
    fetching: state.workouts.fetching,
    error: state.workouts.error,
    workout: state.workouts.map[router.match.params.workoutId],
    updating: state.workouts.updating,
    creatingExercise: state.exercises.creating,
    deletingExercise: state.exercises.deleting,
    pushHistory: router.history.push,
    goBack: router.history.goBack,
  };
};
const mapDispatchToProps = {
  showNotification,
  fetchWorkout,
  updateWorkout,
  createExercise,
  deleteExercise,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
