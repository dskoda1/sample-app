import * as React from 'react';
import { createStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ActivityFeedView from './ActivityFeedView';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/types';
import { useEffect } from 'react';
import { fetchActivity } from './redux';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  const state = useSelector((state: AppState) => state.activityState);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('dispatching fetchActivity');
    dispatch(fetchActivity());
  }, [dispatch]);

  if (state.fetching) {
    return <CircularProgress />;
  }
  return (
    <div className={classes.root}>
      <Grid container justify={'center'} direction={'row'} spacing={3}>
        <Grid item xs={12} className={classes.header}>
          <Typography variant="h2">Your Activity</Typography>
          <Typography variant="subtitle1" color={'error'}>
            * Under construction *
          </Typography>
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
