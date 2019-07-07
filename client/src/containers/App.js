import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { Switch, Route, withRouter } from 'react-router-dom';

import { fetchProfile } from '../redux/actions';

import HomePage from './HomePage';
import Authentication from './Authentication';
import Snackbar from './Snackbar';
import AuthenticatedRoute from './AuthenticatedRoute';
import WorkoutsHome from '../apps/workouts/Home';
import WorkoutDetails from '../apps/workouts/Workout';
import WorkoutsLoggedOutView from '../apps/workouts/Workout/LoggedOutView';

import NavBar from './NavBar';
import NotFound from '../components/NotFound';
import ExercisePage from '../apps/workouts/Exercise';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    textAlign: 'center',
  },
});

class App extends Component {
  componentWillMount() {
    if (!this.props.user && !this.props.fetching) {
      this.props.fetchProfile();
    }
  }

  render() {
    return (
      <NavBar>
        <Snackbar />
        <Grid container direction="column">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/auth" component={Authentication} />
            <AuthenticatedRoute
              exact
              component={WorkoutsHome}
              fallback={WorkoutsLoggedOutView}
              path="/workouts"
            />
            <AuthenticatedRoute
              exact
              path="/workouts/:workoutId"
              component={WorkoutDetails}
              fallback={WorkoutsLoggedOutView}
            />
            <AuthenticatedRoute
              exact
              path="/workouts/:workoutId/exercises/:exerciseId"
              component={ExercisePage}
              fallback={WorkoutsLoggedOutView}
            />
            <Route component={NotFound} />
          </Switch>
        </Grid>
      </NavBar>
    );
  }
}
const mapStateToProps = ({ auth: { user, fetching, error } }) => {
  return {
    user,
  };
};
const mapDispatchToProps = {
  fetchProfile,
};

// Need to use withRouter because of https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(App))
);
