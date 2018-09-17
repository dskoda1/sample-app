// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


type Props = {
    classes: {
        textField: any,
        button: any,
    },
}


export default (props: Props) => (
    <div>
        <Grid style={{justifyContent: 'center'}}>
        <Grid item xs={12} >
        <TextField
          id="username-input"
          label="Username"
          className={props.classes.textField}
        //   onChange={this.handleChange('name')}
        //   margin="normal"
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
          id="standard-password-input"
          label="Password"
          className={props.classes.textField}
          type="password"
        //   autoComplete="current-password"
        //   margin="normal"
        />
        </Grid>
        <Button variant="contained" color="primary" className={props.classes.button}>
        Submit
      </Button>
      </Grid>
    </div>
);


