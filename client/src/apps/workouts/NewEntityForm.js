import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default class NewEntityForm extends Component {
  state = {
    name: '',
  };
  updateField = field => e => {
    this.setState({ [field]: e.target.value });
  };
  handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.onCreate(this.state.name);
    }
  };

  render() {
    const { onCreate, creating, classes, entityName } = this.props;
    return (
      <Grid container justify="space-around">
        <form onSubmit={() => onCreate(this.state.name)}>
          <Grid item xs={12}>
            <TextField
              label={entityName}
              className={classes.textField}
              onChange={this.updateField('name')}
              onKeyDown={this.handleKeyDown}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => onCreate(this.state.name)}
              disabled={creating}
            >
              Submit
            </Button>
          </Grid>
        </form>
      </Grid>
    );
  }
}

NewEntityForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  creating: PropTypes.bool.isRequired,
  entityName: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};
