import * as React from 'react';

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import AppDrawer from './AppDrawer';
import AppToolbar from './AppToolbar';

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
  },
});

type Props = {
  user: string,
  logout: func,
  children: React.node,
  appTitle: string,
  classes: any,
};

type State = {
  open: boolean,
};

class AppNavigation extends React.Component<Props, State> {
  state = {
    open: false,
  };
  // Toggle drawer offers both the AppToolbar and the AppDrawer
  // to have a say in whether the toolbar is open.
  toggleDrawer = open => () => {
    this.setState({
      open,
    });
  };
  render() {
    const { classes, children, appTitle, user, logout } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <AppToolbar
            appTitle={appTitle}
            toggleDrawer={this.toggleDrawer(true)}
            classes={classes}
            user={user}
            logout={logout}
          />
        </AppBar>
        <AppDrawer
          classes={classes}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}
          isOpen={this.state.open}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AppNavigation);
