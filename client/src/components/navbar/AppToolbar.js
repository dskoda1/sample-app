import React from 'react';
import { Link } from 'react-router-dom';

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ProfileMenu from './ProfileMenu';

const AppToolbar = ({
  appTitle,
  toggleDrawer,
  classes: { flex },
  logout,
  user,
}) => (
  <Toolbar>
    {/* Hamburger icon */}
    <IconButton color="inherit" aria-label="open drawer" onClick={toggleDrawer}>
      <MenuIcon />
    </IconButton>
    {/* App title home page link */}
    <Typography variant="title" color="inherit" className={flex} noWrap>
      <Link to="/" style={{ textDecoration: 'none', color: '#FFF' }}>
        {appTitle}
      </Link>
    </Typography>
    {/* By not putting flex className, these go to the right */}
    {// Show the profile menu if the user is logged in otherwise send them to auth
    user ? (
      <ProfileMenu logout={logout} />
    ) : (
      <Link to="/auth" style={{ textDecoration: 'none', color: '#FFF' }}>
        <Button color="inherit">Login</Button>
      </Link>
    )}
  </Toolbar>
);

export default AppToolbar;
