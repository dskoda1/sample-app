// @flow
 
import type { Match } from '../matches';

export type MatchReducerState = {
    fetching: boolean,
    matches: Array<Match>,
    error: ?string,
};

export type MatchReducerAction = {
    type: string,
    error: ?string,
    matches: Array<Match>,
};