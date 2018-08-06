// @flow

export type Team = {
    code: string,
    country: string,
    goals: number,
    penalties: number,
};

export type TeamStats = {
    attempts_on_goal: number,
    ball_possession: number,
    corners: number,
    pass_accuracy: number,
    yellow_cards: number,
    red_cards: number,
    // and a bunch more
};

export type Event = {
    id: number,
    player: string,
    time: string,
    type_of_event: string,
};

export type Weather = {
    humidity: string,
    temp_celsius: string,
    temp_farenheit: string,
    wind_speed: string,
    description: string,
}

export type Match = {
    home_team: Team,
    away_team: Team,
    home_team_events: Array<Event>,
    away_team_events: Array<Event>,
    home_team_statistics: TeamStats,
    away_team_statistics: TeamStats,
    attendance: string,
    venue: string,
    location: string,
    status: string,
    time: string,
    datetime: string,
    last_event_update_at: string,
    last_score_update_at: string,
    fifa_id: string,
    winner?: string,
    winner_code?: string,
    stage_name: string,
    weather: Weather,
    officials: Array<string>,
};