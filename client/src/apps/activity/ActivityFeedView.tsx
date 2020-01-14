import * as React from 'react';
import { createStyles, Typography, List, Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/types';
import ActivityItemView from './ActivityItemView';
import NewActivityForm from './NewActivityForm';

const useStyles = makeStyles(theme =>
  createStyles({
    list: {
      flexGrow: 1,
      marginTop: '10px',
    },
    icon: {
      margin: '-5px',
    },
  })
);

interface ActivityFeedViewProps {}

const ActivityFeedView: React.FunctionComponent<ActivityFeedViewProps> = () => {
  const activityState = useSelector((state: AppState) => state.activityState);
  const classes = useStyles();
  return (
    <Grid container justify={'space-between'}>
      <Grid item xs={12}>
        <NewActivityForm />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Your Recent Activity</Typography>
      </Grid>
      <List className={classes.list}>
        <Divider />
        {activityState.activity.map(activity => (
          <ActivityItemView key={activity.id} activityItem={activity} />
        ))}
      </List>
    </Grid>
  );
};

export default ActivityFeedView;
