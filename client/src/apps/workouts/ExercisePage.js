import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import { showNotification } from '../../redux/actions';
import {
  fetchWorkout,
  createSet,
  deleteSet,
} from '../../redux/actions/workouts';
import NewSetForm from './NewSetForm';
import SetHeader from './SetHeader';

class ExercisePage extends Component {
  componentDidMount() {
    this.props.fetchWorkout(this.props.workoutId);
  }

  createCardioSet = (duration, distance) => {
    const { workoutId, exerciseId, createSet } = this.props;
    createSet(workoutId, exerciseId, { duration, distance });
  };

  createLiftSet = (weight, reps) => {
    const { workoutId, exerciseId, createSet } = this.props;
    createSet(workoutId, exerciseId, { weight, reps });
  };

  render() {
    const { workout, goBack, fetching, exerciseId, workoutId } = this.props;
    if (!workout || fetching) {
      return <div>loading</div>;
    }
    const exercise = workout.exercises.find(
      exercise => exercise.id === parseInt(exerciseId, 10)
    );
    if (!exercise) {
      return <div>Could not find exercise {exerciseId}</div>;
    }

    return (
      <div>
        <Grid container justify="space-around">
          <Grid item xs={12} sm={6}>
            <SetHeader exercise={exercise} goBack={goBack} />
          </Grid>
          <Grid item xs={12} sm={9}>
            <NewSetForm
              type={exercise.type}
              createLiftSet={this.createLiftSet}
              createCardioSet={this.createCardioSet}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            {exercise.sets.map(set => (
              <div>
                {exercise.type === 'cardio'
                  ? `Duration: ${set.duration} Distance: ${set.distance}`
                  : `Weight: ${set.weight} Reps: ${set.reps}`}
              </div>
            ))}
          </Grid>
        </Grid>
      </div>
    );
  }
}

ExercisePage.propTypes = {
  workoutId: PropTypes.string.isRequired,
  exerciseId: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.string,
  workout: PropTypes.object,
  goBack: PropTypes.func.isRequired,
  creatingSet: PropTypes.bool.isRequired,
  deletingSet: PropTypes.bool.isRequired,
  createSet: PropTypes.func.isRequired,
};

const mapStateToProps = (state, router) => {
  return {
    workoutId: router.match.params.workoutId,
    exerciseId: router.match.params.exerciseId,
    fetching: state.workouts.fetching,
    error: state.workouts.error,
    workout: state.workouts.map[router.match.params.workoutId],
    creatingSet: state.sets.creating,
    deletingSet: state.sets.deleting,
    goBack: router.history.goBack,
  };
};
const mapDispatchToProps = {
  showNotification,
  fetchWorkout,
  createSet,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExercisePage);
