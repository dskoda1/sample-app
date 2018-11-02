import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthenticatedRoute = ({
  component,
  fallback,
  isAuthenticated,
  ...rest
}) => {
  return <Route {...rest} render={isAuthenticated ? component : fallback} />;
};

const mapStateToProps = ({ auth: { user } }) => {
  return {
    isAuthenticated: !!user,
  };
};

export default connect(
  mapStateToProps,
  {}
)(AuthenticatedRoute);
