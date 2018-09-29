// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

import Navigation from './TempDrawerNav';

type Props = {
  children: React.Node,
  user: string
};

const NavBar = (props: Props) => (
  <Navigation 
      user={props.user}
      drawerItems={
        <ListItem button>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Matches" />
        </ListItem>
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

export default connect(mapStateToProps, {})(NavBar);
