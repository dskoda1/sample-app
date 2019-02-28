import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SettingsIcon from '@material-ui/icons/Settings';
import Moment from 'react-moment';

import IconMenu from '../../components/IconMenu';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class DetailsHeader extends Component {

  state = {
    isEditing: false,
    editedName: "",
  }

  handleSettingsSelection = choice => {
    if (choice === 'complete') {
      this.props.completeWorkout();
    } 
    else if (choice === 'edit') {
      this.setState({isEditing: true})
    }
  };

  onEdit = (editedName) => {
    this.setState({editedName})
  }

  submitEdit = () => {
    this.props.updateWorkoutName(this.state.editedName)
    this.setState({isEditing: false})
  }

  render() {
    const { classes, workout } = this.props;
    let actions = [{ choice: 'edit', text: 'Edit' }]
    if (!workout.finishedAt) {
      actions.push({ choice: 'complete', text: 'Complete' })
    }

    return (
      <Paper className={classes.root}>
        <Grid container justify="flex-start">
          <Grid item xs={9}>
            <EditableField 
              isEditing={this.state.isEditing}
              label="name"
              value={workout.name}
              onEdit={this.onEdit /* not needed*/}
              typogrophyVariant="display2"
              />
          </Grid>
          <Grid item xs={3}>
            <EditOrConfirm
              isEditing={this.state.isEditing}
              editChoices={actions}
              handleSettingsSelection={this.handleSettingsSelection}
              submitChange={this.submitEdit}
              />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="headline">
              <Moment
                durationFromNow
                date={workout.createdAt}
                interval={1000}
              />{' '}
              {workout.finishedAt ? 'complete' : ''}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="title"># of exercises</Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
let EditOrConfirm = ({isEditing, editChoices, handleSettingsSelection, submitChange, disabled}) => {
  return isEditing ? <Button
      variant="contained"
      color="primary"
      onClick={submitChange}
      disabled={disabled}
    >
    Save
  </Button> : <IconMenu
              iconClass={SettingsIcon}
              choices={editChoices}
              onSelect={handleSettingsSelection}
            />
}

let EditableField = ({isEditing, label, typogrophyVariant, value, onEdit}) => {
  return isEditing ? <TextField
      label={label}
      onChange={(e) => onEdit(e.target.value)} 
    /> : <Typography variant={typogrophyVariant}>{value}</Typography>;

}
DetailsHeader.propTypes = {
  workout: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    finishedAt: PropTypes.string,
  }),
  updating: PropTypes.bool.isRequired,
  completeWorkout: PropTypes.func.isRequired,
  updateWorkoutName: PropTypes.func.isRequired,
};

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
  },
});

export default withStyles(styles)(DetailsHeader);
