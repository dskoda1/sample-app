// @flow

import * as React from 'react';

import type { Match } from '../../types/matches';
import MuiTabs from '../MuiTabs';

type Props = {
    match: Match
}

const MatchDetails = ( props: Props ) => {
    const {
        match
    } = props;
    let weatherComponent = null;
    if (match.weather !== null) {
        weatherComponent = (
            <div>
                {match.weather.description} - {match.weather.temp_farenheit}&#176;F <br />
                Wind speed: {match.weather.wind_speed} mph <br />
            </div>
        )
    }
    else {
        weatherComponent = (
            <div>
                Weather not available for future games.
            </div>
        )
        
    }

    const tabs = [
        {
            title: 'Summary',
            body: (
                <div >
                    {match.stage_name} - {match.status} <br />
                    Venue: {match.venue} <br />
                    Attendance: {match.attendance} <br />
                </div>
            )
        },
        {
            title: 'Weather',
            body: weatherComponent,
        },
    ]
    return (
        <div>
            <MuiTabs tabs={tabs} />
        </div>
    );
};

export default MatchDetails;