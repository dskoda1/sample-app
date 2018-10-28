// @flow

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

import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';

import TopLink from './TopLink';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'fixed',
    marginLeft: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  flex: {
    flex: 1,
  },
  navLink: {
    textDecoration: 'none',
    
  }
});

type Props = {
    drawerItems: React.Node,
    children: React.Node,
    appTitle: string,
    classes: any,
    user: string,
};

type State = {
    open: boolean,
};

class TempDrawerNav extends React.Component<Props, State> {
  state = {
    open: false
  };

  toggleDrawer = (open) => () => {
      this.setState({
          open
      });
  }

  render() {
    const { 
        classes, 
        drawerItems,
        children,
        appTitle,
        user,
    } = this.props;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {drawerItems}
        </List>
        <Divider />
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography 
              variant="title" 
              color="inherit" 
              className={classes.flex}
              noWrap>
              <Link to="/" style={{textDecoration: 'none', color: '#FFF'}}>
                {appTitle}
              </Link>
            </Typography>
            <TopLink />
            {
              user ? 
              <Typography 
                variant="subheading" 
                color="inherit" 
                noWrap>
                {user}
              </Typography> :
              <Button color="inherit">
                <Link to="/auth" style={{ textDecoration: 'none', color: '#FFF'}}>
                  Login
                </Link>
              </Button>
            }
            
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          open={this.state.open}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {drawer}
          </div>
        </SwipeableDrawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  }
}



export default withStyles(styles, { withTheme: true })(TempDrawerNav);