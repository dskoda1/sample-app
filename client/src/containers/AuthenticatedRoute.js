import React from 'react';
import PropTypes from 'prop-types';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Comp,
  fallback: Fallback,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (isAuthenticated) {
        return <Comp {...props} />;
      }
      return <Fallback />;
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  fallback: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ auth: { user } }) => {
  return {
    isAuthenticated: !!user,
  };
};

export default connect(mapStateToProps, {})(PrivateRoute);
