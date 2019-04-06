import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles, IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import BackIcon from '@material-ui/icons/ArrowBack';
import DeleteExercise from './DeleteExercise';

class ExerciseHeader extends Component {
  render() {
    const { classes, exercise, deleteExercise, deletingExercise } = this.props;
    return (
      <Paper className={classes.root}>
        <Grid container justify="flex-start">
          <Grid item xs={2}>
            <IconButton className={classes.button} onClick={this.props.goBack}>
              <BackIcon />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="display2">{exercise.name}</Typography>
          </Grid>
          <Grid item xs={2}>
            <DeleteExercise
              exerciseName={exercise.name}
              deleteExercise={deleteExercise}
              deletingExercise={deletingExercise}
            />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
ExerciseHeader.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sets: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
  }),
  goBack: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  deleteExercise: PropTypes.func.isRequired,
  deletingExercise: PropTypes.bool.isRequired,
};

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
    textAlign: 'center',
  },
  button: {
    marginBottom: theme.spacing.unit,
  },
});

export default withStyles(styles)(ExerciseHeader);
