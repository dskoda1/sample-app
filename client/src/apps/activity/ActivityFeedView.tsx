import * as React from 'react';
import { createStyles, Typography, List, Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/types';
import ActivityItemView from './ActivityItemView';
import NewActivityForm from './NewActivityForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';

const useStyles = makeStyles(theme =>
  createStyles({
    list: {
      flexGrow: 1,
      marginTop: '10px',
    },
    icon: {
      margin: '-5px',
    },
    feed: {
      marginTop: '30px',
    },
  })
);

interface ActivityFeedViewProps {}

const ActivityFeedView: React.FunctionComponent<ActivityFeedViewProps> = () => {
  const activityState = useSelector((state: AppState) => state.activityState);
  const activityTypes = activityState.activityTypes.map(at => at.name);
  const [activityFilter, setActivityFilter] = useState('');
  const classes = useStyles();
  let filteredActivity = activityFilter
    ? activityState.activity.filter(
        activity => activity.ActivityType.name === activityFilter
      )
    : activityState.activity;

  return (
    <Grid container justify={'space-around'}>
      <Grid item xs={9} sm={6} md={4}>
        <NewActivityForm />
      </Grid>
      <Grid item xs={12} className={classes.feed}>
        <Typography variant="h5">Your Recent Activity</Typography>
      </Grid>
      <Grid item xs={9} sm={6} md={4}>
        <Autocomplete
          id="activity-type-filter-autocomplete"
          options={activityTypes}
          getOptionLabel={(option: string) => option}
          onInputChange={(event: any, newValue: string | undefined) => {
            if (newValue === undefined) {
              newValue = '';
            }
            setActivityFilter(newValue);
          }}
          renderInput={params => (
            <TextField {...params} label="Filter" margin="normal" fullWidth />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <List className={classes.list}>
          <Divider />
          {activityState.fetching && <CircularProgress />}
          {!activityState.fetching &&
            filteredActivity.map(activity => (
              <ActivityItemView key={activity.id} activityItem={activity} />
            ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default ActivityFeedView;
