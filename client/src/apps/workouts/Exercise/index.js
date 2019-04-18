import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { showNotification } from '../../../redux/actions';
import {
  fetchWorkout,
  createSet,
  deleteExercise,
  deleteSet,
} from '../../../redux/actions/workouts';
import NewSetForm from './NewSetForm';
import ExerciseHeader from './ExerciseHeader';
import SetTable from './SetTable';

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

  deleteExercise = () => {
    this.props.deleteExercise(this.props.workoutId, this.props.exerciseId);
    this.props.goBack();
  };


  deleteSet = (setId) => {
    this.props.deleteSet(this.props.workoutId, this.props.exerciseId, setId);
  }

  render() {
    const {
      workout,
      goBack,
      fetching,
      exerciseId,
      deletingExercise,
      creatingSet,
    } = this.props;
    if (!workout || fetching) {
      return <div>loading</div>;
    }
    const exercise = workout.exercises.find(
      exercise => exercise.id === parseInt(exerciseId, 10)
    );
    if (!exercise) {
      return <div>Could not find exercise {exerciseId}</div>;
    }
    const sets = exercise.sets.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
    });

    return (
      <div>
        <Grid container justify="space-around">
          <Grid item xs={12} sm={6}>
            <ExerciseHeader
              exercise={exercise}
              goBack={goBack}
              deleteExercise={this.deleteExercise}
              deletingExercise={deletingExercise}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <NewSetForm
              type={exercise.type}
              createLiftSet={this.createLiftSet}
              createCardioSet={this.createCardioSet}
              creating={creatingSet}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <SetTable exerciseType={exercise.type} sets={sets} deleteSet={this.deleteSet} deletingSet={this.props.deletingSet}/>
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
  deletingExercise: PropTypes.bool.isRequired,
  deleteExercise: PropTypes.func.isRequired,
  deleteSet: PropTypes.func.isRequired,
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
    deletingExercise: state.exercises.deleting,
    goBack: router.history.goBack,
  };
};
const mapDispatchToProps = {
  showNotification,
  fetchWorkout,
  createSet,
  deleteExercise,
  deleteSet,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExercisePage);
