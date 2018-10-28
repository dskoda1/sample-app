import * as React from 'react';
import { Link } from 'react-router-dom';


import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom'

  
class ProfileMenu extends React.Component {
    state = {
      open: false
    }
    toggleOpen = (open) => () => {
      this.setState({
          open
      });
    }
  
    handleLogout = () => {
        // TODO: Issue logout action 
      this.setState({open: false})
    }
    render() {
      const { open } = this.state
      return  (
        <div>
          <IconButton
            aria-owns={open ? 'menu-appbar' : null}
            aria-haspopup="true"
            onClick={this.toggleOpen(true)}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={this.toggleOpen(false)}
          >
            <MenuItem onClick={this.toggleOpen(false)}>Profile</MenuItem>
            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      )
    }
  }

export default withRouter(ProfileMenu);