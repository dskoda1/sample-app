import * as React from 'react';

import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

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
      this.props.logout();
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

ProfileMenu.propTypes = {
  logout: PropTypes.func.isRequired
}

export default withRouter(ProfileMenu);