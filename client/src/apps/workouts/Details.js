import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
// import { withStyles } from '@material-ui/core/styles';

import { showNotification, fetchWorkout } from '../../redux/actions';

class Details extends Component {
  render() {
    return <div>Workout {this.props.id}</div>;
  }
}

Details.propTypes = {
  workout: PropTypes.shape({}),
};

const mapStateToProps = (state, router) => {
  return {
    id: router.match.params.workoutId,
  };
};
const mapDispatchToProps = {
  showNotification,
  fetchWorkout,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
