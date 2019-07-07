import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  updateField = field => e => {
    this.setState({ [field]: e.target.value });
  };

  handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.handleSubmit(this.state.username, this.state.password);
    }
  };

  render() {
    const { classes, handleSubmit, fetching } = this.props;
    const { username, password } = this.state;
    return (
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <TextField
            label="Username"
            className={classes.textField}
            onChange={this.updateField('username')}
            onKeyDown={this.handleKeyDown}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            onChange={this.updateField('password')}
            onKeyDown={this.handleKeyDown}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleSubmit(username, password)}
            disabled={fetching}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default Login;
