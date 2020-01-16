import * as React from 'react';
import { Typography, ListItem, Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
// import makeStyles from '@material-ui/core/styles/makeStyles';
import Moment from 'react-moment';

import { Activity } from './redux';
import DeleteActivityItem from './DeleteActivityItem';

// const useStyles = makeStyles(theme =>
//   createStyles({
//     list: {
//       flexGrow: 1,
//     },
//     icon: {
//       margin: '-5px',
//     },
//   })
// );

interface ActivityItemProps {
  activityItem: Activity;
}

const ActivityItemView: React.FunctionComponent<ActivityItemProps> = ({
  activityItem,
}) => {
  // const classes = useStyles();
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
        <Grid item xs={3}>
          <Moment format={'h:mm:ss a M-D'}>{activityItem.createdAt}</Moment>
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
