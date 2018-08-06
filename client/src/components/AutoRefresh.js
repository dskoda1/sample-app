// @flow

import React, { Component } from 'react'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

type Props = {
    onRefresh: Function
};

type State = {
    shouldRefresh: bool,
    seconds: number,
    interval?: any,
}

const initialState : State = {
    shouldRefresh: false,
    seconds: 0,
};

class AutoRefresh extends Component<Props, State> {
    constructor() {
        super();
        this.state = initialState;
    };

    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));
        if (this.state.seconds >= 30) {
            this.clearRefreshTimer();
            this.props.onRefresh();
            this.setRefreshTimer();
        }
    }

    setRefreshTimer () {
        this.setState({
            interval: setInterval(() => this.tick(), 1000)
        })
    }

    clearRefreshTimer() {
        clearInterval(this.state.interval);
        this.setState({seconds: 0});
    }

    componentWillUnmount() {
        this.clearRefreshTimer();
    }

    handleChange = (event: {target: {checked: boolean}}) => {
        this.setState({shouldRefresh: event.target.checked});
        if (event.target.checked) {
            this.setRefreshTimer();
        } else {
            this.clearRefreshTimer();
        }
    };

    render() {
        return (
            <div>
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.state.shouldRefresh}
                            onChange={this.handleChange}
                            value="shouldRefresh"
                            color="primary"
                        />
                    }
                    label="Auto Refresh"
                    />
            </div>
        );
    }
    
};

export default AutoRefresh;