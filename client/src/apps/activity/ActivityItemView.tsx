import * as React from 'react';
import { Typography, ListItem, Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Moment from 'react-moment';

import { Activity } from './redux';
import DeleteActivityItem from './DeleteActivityItem';
import EditActivityDialog from './EditActivityDialog';

interface ActivityItemProps {
  activityItem: Activity;
}

const ActivityItemView: React.FunctionComponent<ActivityItemProps> = ({
  activityItem,
}) => {
  return (
    <>
      <ListItem>
        <Grid item xs={3}>
          <Typography variant="subtitle1">
            {activityItem.ActivityType.name}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1">
            {activityItem.Tag ? activityItem.Tag.name : ''}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1">{activityItem.duration}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Moment format={'h:mm A M-D'}>
            {activityItem.timestamp}
          </Moment>
        </Grid>
        <Grid item xs={1}>
          <EditActivityDialog activityItem={activityItem} />
        </Grid>
        <Grid item xs={1}>
          <DeleteActivityItem activityId={activityItem.id} />
        </Grid>
      </ListItem>
      <Divider />
    </>
  );
};

export default ActivityItemView;
