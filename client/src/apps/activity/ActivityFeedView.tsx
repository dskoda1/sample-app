import * as React from 'react';
import { createStyles, Typography, List, Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

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

interface ActivityFeedViewProps {
  // list: ListType;
}

const ActivityFeedView: React.FunctionComponent<ActivityFeedViewProps> = (
  {
    // list,
  }
) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5">Your Recent Activity</Typography>
      </Grid>
      <List className={classes.list}>
        <Divider />
        Nothing to see here
      </List>
    </Grid>
  );
};

export default ActivityFeedView;
