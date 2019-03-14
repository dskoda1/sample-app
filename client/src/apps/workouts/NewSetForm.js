import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles, Paper, Typography } from '@material-ui/core';

const initialState = {
  duration: undefined,
  distance: undefined,
  weight: undefined,
  reps: undefined,
};

class NewSetForm extends Component {
  state = initialState;
  updateField = field => e => {
    e.preventDefault();
    this.setState({ [field]: parseFloat(e.target.value) });
  };

  handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.submitCreate();
    }
  };

  submitCreate = () => {
    if (this.props.type === 'lift') {
      this.props.createLiftSet(this.state.weight, this.state.reps);
    } else if (this.props.type === 'cardio') {
      this.props.createCardioSet(this.state.duration, this.state.distance);
    }
  };

  canCreate = () => {
    if (this.props.type === 'lift') {
      return this.state.weight > 0 && this.state.reps > 0;
    } else if (this.props.type === 'cardio') {
      return this.state.duration > 0 && this.state.distance > 0;
    }
  };

  getFields = () => {
    console.log(this.props.type);
    return this.props.type === 'lift'
      ? this.getLiftFields()
      : this.getCardioFields();
  };

  getCardioFields = () => {
    return [
      { display: 'Duration', stateField: 'duration' },
      { display: 'Distance', stateField: 'distance' },
    ];
  };

  getLiftFields = () => {
    return [
      { display: 'Weight', stateField: 'weight' },
      { display: 'Reps', stateField: 'reps' },
    ];
  };

  render() {
    const { creating, classes } = this.props;
    return (
      <Paper className={classes.root} elevation={1}>
        <Grid container justify="flex-start">
          <Grid item xs={12}>
            <Typography>Add Set</Typography>
          </Grid>
          {this.getFields().map(({ display, stateField }, i) => (
            <Grid item key={i} xs={4}>
              <TextField
                label={display}
                value={this.state[stateField]}
                onChange={this.updateField(stateField)}
                type="number"
                className={this.props.classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          ))}
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.submitCreate}
              disabled={creating || !this.canCreate()}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
    textAlign: 'center',
  },
  textField: {
    marginTop: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit,
    // marginLeft: theme.spacing.unit,
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit * 4,
  },
});

NewSetForm.propTypes = {
  type: PropTypes.string.isRequired,
  creating: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  createLiftSet: PropTypes.func.isRequired,
  createCardioSet: PropTypes.func.isRequired,
};
export default withStyles(styles)(NewSetForm);
