import React from 'react';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import ListItem from '@material-ui/core/ListItem';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

const AppDrawer = ({ classes: { toolbar }, onClose, onOpen, isOpen }) => (
  <SwipeableDrawer open={isOpen} onClose={onClose} onOpen={onOpen}>
    <div tabIndex={0} role="button" onClick={onClose} onKeyDown={onClose}>
      <div className={toolbar} />
      <Divider />
      <List>
        <Link to="/workouts" style={{ textDecoration: 'none', color: '#000' }}>
          <ListItem button>
            <ListItemIcon>
              <DirectionsRunIcon />
            </ListItemIcon>
            <ListItemText primary="Workouts" />
          </ListItem>
        </Link>
      </List>
      <Divider />
    </div>
  </SwipeableDrawer>
);

export default AppDrawer;
