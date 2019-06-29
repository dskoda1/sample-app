import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// import NewWorkoutForm from './NewWorkoutForm';
// import WorkoutList from './WorkoutList';

import { showNotification } from '../../../redux/actions';
import { fetchInventory } from '../../../redux/inventory/actions';

class InventoryHomePage extends Component {
  componentDidUpdate() {
    if (!this.props.fetching && !this.props.workouts) {
      this.props.fetchInventory();
    }
  }

  componentDidMount() {
    this.props.fetchInventory();
  }

  startNew = name => {
    if (!name || name.length < 3) {
      this.props.showNotification('not a valid name', 'error');
      return;
    }
    // this.props.createWorkout(name, this.props.pushHistory);
  };

  render() {
    return (
      <div>
        <Typography variant="display3">INventory</Typography>
        <Grid container justify="space-around">
          {/* <Grid item xs={12} sm={6}>
            <NewWorkoutForm
              startNew={this.startNew}
              creating={this.props.creating}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <WorkoutList
              workouts={this.props.workouts ? this.props.workouts : []}
            />
          </Grid> */}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, router) => {
  return {
    pushHistory: router.history.push,
    loggedIn: state.auth.loggedIn,
    inventory: state.inventory.list,
    fetching: state.inventory.fetching,
    error: state.inventory.error,
  };
};
const mapDispatchToProps = {
  showNotification,
  fetchInventory,
};

InventoryHomePage.propTypes = {
  // redux state props
  pushHistory: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  inventory: PropTypes.array,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.string,
  // actions
  showNotification: PropTypes.func.isRequired,
  fetchInventory: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryHomePage);
