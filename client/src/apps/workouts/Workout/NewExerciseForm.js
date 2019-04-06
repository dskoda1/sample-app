import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {
  withStyles,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
} from '@material-ui/core';

const initialState = {
  name: '',
  type: '',
};

class NewExerciseForm extends Component {
  state = initialState;
  updateField = field => e => {
    this.setState({ [field]: e.target.value });
  };

  handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.submitCreate();
    }
  };

  submitCreate = () => {
    this.props.onCreate(this.state.name, this.state.type);
    this.setState(initialState);
  };
  handleTypeChange = e => {
    this.setState({ type: e.target.value });
  };

  render() {
    const { creating, classes } = this.props;

    const canCreate = this.state.name.length > 3 && this.state.type !== '';

    return (
      <Paper className={classes.root} elevation={1}>
        <Grid container justify="flex-start">
          <Grid item xs={6}>
            <Typography>Add Exercise</Typography>
            <TextField
              label="Name"
              className={classes.textField}
              onChange={this.updateField('name')}
              onKeyDown={this.handleKeyDown}
              value={this.state.name}
            />
          </Grid>

          <Grid item xs={3}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Type</FormLabel>
              <RadioGroup
                name="type"
                value={this.state.type}
                onChange={this.handleTypeChange}
              >
                <FormControlLabel
                  value="lift"
                  control={<Radio color="primary" />}
                  label="Lift"
                />
                <FormControlLabel
                  value="cardio"
                  control={<Radio color="primary" />}
                  label="Cardio"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.submitCreate}
              disabled={creating || !canCreate}
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

NewExerciseForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  creating: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(NewExerciseForm);
