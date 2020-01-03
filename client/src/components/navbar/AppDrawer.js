import React from 'react';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ListIcon from '@material-ui/icons/List';
import LinkItem from 'components/navbar/LinkItem';

const AppDrawer = ({ classes: { toolbar }, onClose, onOpen, isOpen }) => (
  <SwipeableDrawer open={isOpen} onClose={onClose} onOpen={onOpen}>
    <div tabIndex={0} role="button" onClick={onClose} onKeyDown={onClose}>
      <div className={toolbar} />
      <Divider />
      <List>
        <LinkItem linkTo={'/workouts'} text={'Workouts'}>
          <DirectionsRunIcon />
        </LinkItem>
        <LinkItem linkTo={'/finance'} text={'Finance'}>
          <AttachMoneyIcon />
        </LinkItem>
        <LinkItem linkTo={'/activity'} text={'Activity'} />
        <LinkItem linkTo={'/lists'} text={'Lists'}>
          <ListIcon />
        </LinkItem>
      </List>
      <Divider />
    </div>
  </SwipeableDrawer>
);

export default AppDrawer;
