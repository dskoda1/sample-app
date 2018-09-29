// @flow
import React, {Component} from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


type Props = {
    classes: {
        textField: any,
        button: any,
    },
    handleSubmit: Function,
    fetching: boolean
}

type State = {
    username: string,
    password: string,
}

class Login extends Component<Props, State> {

    state: State = {
        username: '',
        password: '',
    }

    updateField = (field) => (e) => {
        this.setState({[field]: e.target.value})
    }

    render() {
        const {
            classes,
            handleSubmit,
            fetching
        } = this.props;
        const {
            username,
            password
        } = this.state;
        return (
            <Grid style={{justifyContent: 'center'}}>
                <Grid item xs={12} >
                    <TextField
                        id="username-input"
                        label="Username"
                        className={classes.textField}
                        onChange={this.updateField('username')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        onChange={this.updateField('password')}
                    />
                </Grid>
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
        );
    }
}

export default Login;