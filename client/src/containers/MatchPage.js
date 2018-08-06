// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';


import { getMatches } from '../redux/actions';

import { MatchCard } from '../components/matches';
import MatchBody from '../components/matchPage/MatchBody';
import MatchDetails from '../components/matchPage/MatchDetails';
import AutoRefresh from '../components/AutoRefresh';
import type { MatchReducerState } from '../types/reducers/index';

const styles = theme => ({
    progress: {
      margin: theme.spacing.unit * 2,
    },
});

type Props = {
    getMatches: Function,
    matches: MatchReducerState,
    fifa_id: string,
    classes: {
        Progress: {
            margin: string
        },
    },
};

class MatchPage extends Component<Props> {
    componentWillMount() {
        this.props.getMatches();
    }

    reload() {
        this.props.getMatches();
    }

    render() {
        const {
            matches: {
                fetching,
                matches,
                error,
            },
            fifa_id,
            classes
        } = this.props

        let child = '';
        if (error) {
            child = `There was an error. go away ${error}`;
        }
        else if (matches && !fetching){
            let match = matches.find((match) => match.fifa_id === fifa_id);
            if (match) {
                child = (
                    <div>
                        <MatchCard 
                            {...match}
                            additionalComponent={<MatchDetails match={match} />}
                             />
                        <br />
                        <MatchBody match={match} />
                    </div>
                )
            }
            else {
                child = `Match ${fifa_id} not found.`;
            }
        }

        return (
            <div>
                <AutoRefresh onRefresh={this.reload.bind(this)}/> {fetching ? <CircularProgress className={classes.Progress} />: null }
                {child}    
            </div>
        )
    }
}

type RootReducer = {
    matches: MatchReducerState
}
type Context = {
    match: {
        params: {
            fifa_id: string,
        },
    },
};

const mapStateToProps = ( state: RootReducer, context: Context ) => {
    return {
        matches: state.matches,
        fifa_id: context.match.params.fifa_id
    }
}
const mapDispatchToProps = {
    getMatches
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(MatchPage));
