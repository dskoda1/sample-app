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

class Register extends Component<Props, State> {

    state: State = {
        username: '',
        password: '',
        passwordConfirmation: '',
    }

    updateField = (field) => (e) => {
        this.setState({[field]: e.target.value})
    }

    handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.handleSubmit(this.state.username, this.state.password);
        }
    }

    render() {
        const {
            classes,
            handleSubmit,
            fetching
        } = this.props;
        const {
            username,
            password,
            passwordConfirmation
        } = this.state;
        return (
            <Grid container direction="column" alignItems="center">
                <Grid item xs={12}>
                    <TextField
                        label="Username"
                        className={classes.textField}
                        onChange={this.updateField('username')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Password"
                        className={classes.textField}
                        type="password"
                        onChange={this.updateField('password')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Confirm Password"
                        className={classes.textField}
                        type="password"
                        onChange={this.updateField('passwordConfirmation')}
                        onKeyPress={this.handleEnterKeyPress}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button} 
                        onClick={() => handleSubmit(username, password, passwordConfirmation)}
                        disabled={fetching}
                        >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default Register;