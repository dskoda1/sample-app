// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { login, showNotification } from '../redux/actions';

import MuiTabs from '../components/MuiTabs';
import { Login } from '../components/authentication';

type Props = {
    login: Function,
    auth: {
        user: any,
        error: string,
        fetching: boolean,
    },
};

type State = {};

const styles = theme => ({
    textField: {
        marginTop: theme.spacing.unit * 2,
    },
    button: {
        marginTop: theme.spacing.unit * 4,
    }
  });

class Authentication extends Component<Props, State> {
    handleLogin = (username, password) => {
        if (password.length < 6) {
            this.props.showNotification('Password must be at least 6 characters', 'error')
            return;
        }

        this.props.login(username, password);
    }

    render() {
        const {
            classes,
            auth: { fetching }
        } = this.props;
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
                                    body: (
                                        <div>
                                            register component
                                        </div>
                                    )  
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
    showNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Authentication));
