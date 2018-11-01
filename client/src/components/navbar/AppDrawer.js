import React from 'react';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

 const AppDrawer = ({
    classes: { toolbar },
    onClose,
    onOpen,
    isOpen
}) => (
    <SwipeableDrawer
        open={isOpen}
        onClose={onClose}
        onOpen={onOpen}
    >
        <div
        tabIndex={0}
        role="button"
        onClick={onClose}
        onKeyDown={onClose}
        >
            <div className={toolbar} />
            <Divider />
            <List>
                <ListItem button>
                <ListItemIcon>
                    <StarIcon />
                </ListItemIcon>
                <ListItemText primary="Matches" />
                </ListItem>
            </List>
            <Divider />
        </div>
    </SwipeableDrawer>
);

export default AppDrawer;
