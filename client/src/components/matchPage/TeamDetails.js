// @flow

import React from 'react';
import type { Event, Team } from '../../types/matches';
import Typography from '@material-ui/core/Typography';

type Props = {
    team: Team,
    events: Array<Event>
}

const TeamDetails = ( props: Props ) => {
    const {
        team,
        events,
    } = props;
    return (
        <div>
            <Typography variant="headline" gutterBottom>
                        {team.country}
            </Typography>
            <TeamEvents events={events} />
        </div>
    );
};

type TeamEventProps = {
    events: Array<Event>
}

const TeamEvents = (props: TeamEventProps) => {

    const events = props.events || [];

    return (
        <div>
            {events.reverse().map((event) => {
                return (
                    <div key={event.time + event.player}>{event.time} - {event.player} - {event.type_of_event}</div>
                )
            })}
        </div>
    );
}

export default TeamDetails;