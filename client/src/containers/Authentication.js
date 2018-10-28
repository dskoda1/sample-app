// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { login, showNotification, register } from '../redux/actions';

import MuiTabs from '../components/MuiTabs';
import { Login, Register } from '../components/authentication';

type Props = {
    login: Function,
    register: Function,
    auth: {
        user: any,
        error: string,
        fetching: boolean,
    },
};

type State = {
};

const styles = theme => ({
    textField: {
        marginTop: theme.spacing.unit * 2,
    },
    button: {
        marginTop: theme.spacing.unit * 4,
    }
  });

class Authentication extends Component<Props, State> {
    initialState = {
        loggedIn: false
    }

    handleLogin = (username, password) => {
        if (password.length < 6) {
            this.props.showNotification('Password must be at least 6 characters', 'error')
            return;
        }

        this.props.login(username, password);
    }

    handleRegister = (username, password, passwordConfirmation) => {
        if (password !== passwordConfirmation) {
            this.props.showNotification('Passwords do not match', 'error');
            return;
        }

        if (username.length <= 3) {
            this.props.showNotification('Username must be at least 3 characters', 'error');
            return;
        }

        this.props.register(username, password)
    }

    render() {
        const {
            classes,
            auth: { fetching, loggedIn }
        } = this.props;
        if (loggedIn) {
            return <Redirect to="/" />
        }

        return (
                <Grid container spacing={16} justify="center">
                    <Grid item xs={12} sm={8} md={6} lg={3} >
                        <Paper className={classes.paper}>
                            <MuiTabs tabs={[
                                {
                                    title: "Login",
                                    key: "login",
                                    body: <Login
                                        classes={classes}
                                        handleSubmit={this.handleLogin}
                                        fetching={fetching}
                                    />
                                },
                                {
                                    title: "Register",
                                    key: "register",
                                    body: <Register
                                        classes={classes}
                                        handleSubmit={this.handleRegister}
                                        fetching={fetching}
                                    />
                                },
                            ]} />
                        </Paper>
                    </Grid>
                </Grid>
        );
    }
    
}

const mapStateToProps = ({auth}) => {
    return {
        auth
    }
};
const mapDispatchToProps = {
    login,
    register,
    showNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Authentication));
