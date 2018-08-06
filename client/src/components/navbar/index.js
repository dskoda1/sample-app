// @flow

import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

import Navigation from './TempDrawerNav';

type Props = {
  children: React.Node
};

const NavBar = (props: Props) => (
  <Navigation 
      drawerItems={
        <ListItem button>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Matches" />
        </ListItem>
      }
      children={props.children}
      appTitle="World Cup Basecamp"
    />
);

export default NavBar;
