// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

import { logout } from '../../redux/actions';

import Navigation from './TempDrawerNav';

type Props = {
  children: React.Node,
  user: string,
  logout: Function,
};

const NavBar = (props: Props) => (
  <Navigation 
      user={props.user}
      drawerItems={
        <div>
        <ListItem button>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Matches" />
        </ListItem>
        <ListItem button onClick={props.logout}>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
      </ListItem>
      </div>
      }
      children={props.children}
      appTitle="Sample App"
    />
);

const mapStateToProps = ( {auth: {user}} ) => {
  return {
    user: user ? user.username : null
  };
}

const mapDispatchToProps = {
  logout
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
