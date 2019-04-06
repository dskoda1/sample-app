import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles, IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SettingsIcon from '@material-ui/icons/Settings';
import Moment from 'react-moment';

import IconMenu from '../../../components/IconMenu';
import BackIcon from '@material-ui/icons/ArrowBack';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class DetailsHeader extends Component {
  state = {
    isEditing: false,
    editedName: '',
  };

  handleSettingsSelection = choice => {
    if (choice === 'complete') {
      this.props.completeWorkout();
    } else if (choice === 'edit') {
      this.setState({ isEditing: true });
    }
  };

  onEdit = editedName => {
    this.setState({ editedName });
  };

  submitEdit = () => {
    this.props.updateWorkoutName(this.state.editedName);
    this.setState({ isEditing: false });
  };

  render() {
    const { classes, workout } = this.props;
    let actions = [{ choice: 'edit', text: 'Edit' }];
    if (!workout.finishedAt) {
      actions.push({ choice: 'complete', text: 'Complete' });
    }

    let duration = (
      <div>
        <Moment durationFromNow date={workout.createdAt} interval={1000} />{' '}
        {workout.finishedAt ? 'complete' : ''}
      </div>
    );
    if (workout.finishedAt) {
      duration = (
        <div>
          <Moment diff={workout.createdAt} unit="minutes">
            {workout.finishedAt}
          </Moment>{' '}
          Minutes
        </div>
      );
    }
    let sets = 0;
    workout.exercises.forEach(exercise => (sets += exercise.sets.length));

    return (
      <Paper className={classes.root}>
        <Grid container justify="flex-start">
          <Grid item xs={2}>
            <IconButton className={classes.button} onClick={this.props.goBack}>
              <BackIcon />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <EditableField
              isEditing={this.state.isEditing}
              label="Name"
              value={workout.name}
              onEdit={this.onEdit /* not needed*/}
              typogrophyVariant="display2"
              classes={classes}
            />
          </Grid>
          <Grid item xs={2}>
            <EditOrConfirm
              isEditing={this.state.isEditing}
              editChoices={actions}
              handleSettingsSelection={this.handleSettingsSelection}
              submitChange={this.submitEdit}
              classes={classes}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subheading">{duration}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subheading">
              {(workout.exercises || []).length} exercises
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subheading">{sets} sets</Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
let EditOrConfirm = ({
  isEditing,
  editChoices,
  handleSettingsSelection,
  submitChange,
  disabled,
}) => {
  return isEditing ? (
    <Button
      variant="contained"
      color="primary"
      onClick={submitChange}
      disabled={disabled}
    >
      Save
    </Button>
  ) : (
    <IconMenu
      iconClass={SettingsIcon}
      choices={editChoices}
      onSelect={handleSettingsSelection}
    />
  );
};

let EditableField = ({
  isEditing,
  label,
  typogrophyVariant,
  value,
  onEdit,
  classes,
}) => {
  return isEditing ? (
    <TextField
      label={label}
      className={classes.textField}
      onChange={e => onEdit(e.target.value)}
    />
  ) : (
    <Typography variant={typogrophyVariant}>{value}</Typography>
  );
};
DetailsHeader.propTypes = {
  workout: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    finishedAt: PropTypes.string,
    exercises: PropTypes.array.isRequired,
  }),
  updating: PropTypes.bool.isRequired,
  completeWorkout: PropTypes.func.isRequired,
  updateWorkoutName: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
    textAlign: 'center',
  },
  textField: {
    marginBottom: theme.spacing.unit * 2,
  },
  button: {
    marginBottom: theme.spacing.unit,
  },
});

export default withStyles(styles)(DetailsHeader);
