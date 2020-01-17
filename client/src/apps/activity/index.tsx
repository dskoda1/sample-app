import * as React from 'react';
import { createStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ActivityFeedView from './ActivityFeedView';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchActivity } from './redux';
import NewActivityForm from './NewActivityForm';

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

interface ActivityPageProps {}

const ActivityPage: React.FunctionComponent<ActivityPageProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchActivity());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Grid container justify={'center'} direction={'row'} spacing={3}>
        <Grid item xs={12} className={classes.header}>
          <Typography variant="h2">Activity</Typography>
        </Grid>
        <Grid item xs={12} sm={9} md={4}>
          <Paper className={classes.paper}>
            <NewActivityForm />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <ActivityFeedView />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ActivityPage;
