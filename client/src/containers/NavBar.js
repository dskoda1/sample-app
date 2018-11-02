import * as React from 'react';
import { connect } from 'react-redux';

import { logout } from '../redux/actions';

import AppNavigation from '../components/navbar';

const NavBar = props => (
  <AppNavigation
    user={props.user}
    logout={props.logout}
    children={props.children}
    appTitle="Sample App"
  />
);

const mapStateToProps = ({ auth: { user } }) => {
  return {
    user: user ? user.username : null,
  };
};

const mapDispatchToProps = {
  logout,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
