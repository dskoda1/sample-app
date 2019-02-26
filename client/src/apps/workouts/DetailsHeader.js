import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SettingsIcon from '@material-ui/icons/Settings';
import Moment from 'react-moment';


import IconMenu from '../../components/IconMenu';

class DetailsHeader 

const DetailsHeader = ({ classes, workout, onFinish, updating }) => {


  return (
    <Paper className={classes.root}>
      <Grid container justify="">
        <Grid item xs={9}>
          <Typography variant="display2">
            {workout.name}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <IconMenu
            iconClass={SettingsIcon}
            choices={[
              { choice: 'edit', text: 'Edit' },
              { choice: 'complete', text: 'Complete' },
            ]}
            onSelect=
          />
        </Grid>
        <Grid item xs={6}>
        <Typography variant="headline">
        <Moment 
          durationFromNow
          date={workout.createdAt}
          interval={1000}
        />
          </Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography variant="title">
        # of exercises
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

DetailsHeader.propTypes = {
  workout: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    finishedAt: PropTypes.string,
  }),
  updating: PropTypes.bool.isRequired,
  onFinish: PropTypes.func.isRequired,
}

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
  },
});

export default withStyles(styles)(DetailsHeader);
