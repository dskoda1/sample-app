import React, {Component} from 'react';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { Switch, Route } from 'react-router-dom';

import { fetchProfile } from '../redux/actions';

import HomePage from './HomePage';
import Authentication from './Authentication';
import Snackbar from './Snackbar';
// import AuthenticatedRoute from './AuthenticatedRoute';

import NavBar from '../components/navbar';
import NotFound from '../components/NotFound';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
  },
});

const Routes = (
  <Switch>
    <Route exact component={HomePage} path='/' />
    <Route exact component={Authentication} path='/auth' />
    <Route component={NotFound} />
  </Switch>
);

class App extends Component {

  componentWillMount() {
    if (!this.props.user && !this.props.fetching) {
      this.props.fetchProfile();
    }
  }

  render() {
    // const {classes, user} = this.props;
    return (
      <div>
      <NavBar 
        children={
          <Grid container spacing={24} direction="column">
            <Snackbar />
            {Routes}
          </Grid>
        }
      />
    </div>
    );
  }
}
const mapStateToProps = ( {auth: {user, fetching, error}} ) => {
  return {
    user
  };
};
const mapDispatchToProps = {
  fetchProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
