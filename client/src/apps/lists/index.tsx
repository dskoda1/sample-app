import * as React from 'react';
import { createStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListsView from './ListsView';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    header: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
  })
);

interface ListPageProps {}

const ListPage: React.FunctionComponent<ListPageProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify={'center'} direction={'row'} spacing={3}>
        <Grid item xs={12} className={classes.header}>
          <Typography variant="h2">Your Lists</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper className={classes.paper}>
            <Typography variant="h5">hello</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper className={classes.paper}>
            <ListsView />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ListPage;
