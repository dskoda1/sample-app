// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import type { Match } from '../../types/matches';

import TeamDetails from './TeamDetails';

type Props = {
    match: Match,
    classes: {
        root: any,
        paper: any,
        button: any,
    },
};

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing.unit,
    }
  });


const MatchBody = ( props: Props ) => {
    const {
        classes,
        match
    } = props;

    const {
        home_team,
        away_team,
        home_team_events,
        away_team_events,
    } = match;


    return (
    <div className={classes.root}>
        <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <TeamDetails 
                        team={home_team} 
                        events={home_team_events} />
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <TeamDetails 
                        team={away_team}
                             events={away_team_events} />
                </Paper>
            </Grid>
        </Grid>
    </div>
    );
};


export default withStyles(styles)(MatchBody);