import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { showNotification } from '../../redux/actions';

const styles = theme => ({
    textField: {
      marginTop: theme.spacing.unit * 2,
    },
    button: {
      marginTop: theme.spacing.unit * 4,
    },
  });

const makePostRequest = (url, body) => {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })
}

class Workouts extends Component {

    state = {
        workouts: [],
        workoutId: null,
        fetching: false,
        loadedOnce: false,
    }

    reload = () => {
        this.setState({fetching: true}, () => {
            fetch('/api/workouts')
            .then(res => res.json())
            .then(data => this.setState({
                workouts: data.workouts, 
                fetching: false, 
                loadedOnce: true
            }))
            .catch(error => console.error(error));
        })
    }

    componentDidUpdate() {
        if (this.props.loggedIn && !this.state.fetching && !this.state.loadedOnce) {
            this.reload();
        }
    }

    startNewWorkout = ( name ) => {
        if (!name || name.length < 3) {
            this.props.showNotification('not a valid name', 'error');
            return;
        }
        makePostRequest('/api/workouts', {name})
            .then(res => res.json())
            .then(workout => this.props.pushHistory(`/workouts/${workout.id}`))
            .then(() => this.props.showNotification('Workout created successfully!', 'success'))
            .then(() => this.reload())
            .catch(error => console.error(error));
    }


    render() {
        return (
            <div>
                <h2>Workouts</h2>
                <WorkoutController classes={this.props.classes} startNewWorkout={this.startNewWorkout}/>
                <WorkoutList workouts={this.state.workouts} />
            </div>
        );
    }
};

Workouts.propTypes = {
    classes: PropTypes.object.isRequired,
    workoutId: PropTypes.number,
    pushHistory: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
}

const mapStateToProps = (state, router) => {
// const mapStateToProps = (state, { match: { params: { workoutId }}}) => {
    return {
        workoutId: router.match.params.workoutId,
        pushHistory: router.history.push,
        loggedIn: state.auth.loggedIn,
    }
}
const mapDispatchToProps = {
    showNotification
};


class WorkoutController extends Component {

    state = {
        newWorkoutName: "",
    }

    updateField = field => e => {
        this.setState({ [field]: e.target.value })
    }

    handleKeyDown = e => {
        if (e.key === 'Enter') {
          e.preventDefault()
          this.props.startNewWorkout(this.state.newWorkoutName);
          console.log('Submitted')
        }
    }

    render() {
        const {
            classes
        } = this.props

        if (this.props.workout) {
            return (
                <div>Workout: {this.props.workout.name}</div> 
            );
        } 

        const fetching = false;
        return (
            <Grid container direction="column" alignItems="center">
                <form onSubmit={() => this.props.startNewWorkout(this.state.newWorkoutName)}>
                <Grid item xs={12}>
                    <TextField
                    label="Name"
                    className={classes.textField}
                    onChange={this.updateField('newWorkoutName')}
                    onKeyDown={this.handleKeyDown}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => this.props.startNewWorkout(this.state.newWorkoutName)}
                    disabled={fetching}
                    >
                    Submit
                    </Button>
                </Grid>
                </form>
            </Grid>
        )
    }
}

WorkoutController.propTypes = {
    classes: PropTypes.object.isRequired
}

class WorkoutList extends Component {
    render() {
        return (
            <div>
                <h4>Your workouts</h4>
                {this.props.workouts.map(workout => {
                return (
                    <WorkoutListItem key={workout.id} {...workout} />
                )
            })}
            </div>
        )
    }
}

WorkoutList.propTypes = {
    workouts: PropTypes.array.isRequired,
}

class WorkoutListItem extends Component {
    render() {
        return (
            <div>{this.props.name}</div>
        )
    }
}

WorkoutListItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    finishedAt: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Workouts));