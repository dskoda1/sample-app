import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { showNotification, fetchWorkouts, fetchWorkout } from '../../redux/actions';

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


/**** Begin workout container which controls http requests and overall state ****/
class Workouts extends Component {
    state = {
        workouts: [],
        fetching: false,
        loadedOnce: false,
        creating: false,
    }

    componentDidUpdate() {
        this.props.fetchWorkouts();
    }

    startNew = ( name ) => {
        if (!name || name.length < 3) {
            this.props.showNotification('not a valid name', 'error');
            return;
        }
        // TODO: Redux-ify this
        this.setState({creating: true}, () => {
            makePostRequest('/api/workouts', {name})
            .then(res => res.json())
            .then(workout => this.props.pushHistory(`/workouts/${workout.id}`))
            .then(() => this.props.showNotification('Workout created successfully!', 'success'))
            .then(() => this.setState({creatingWorkout: false}))
            .then(() => this.reload())
            .catch(error => console.error(error));
        })
    }

    render() {
        return (
            <div>
                <h2>Workouts</h2>
                <CreateNewWorkoutForm
                    classes={this.props.classes}
                    startNew={this.startNew}
                    creating={this.state.creating} />
                <WorkoutList workouts={this.props.workouts} />
            </div>
        );
    }
};

const mapStateToProps = (state, router) => {
    const id = router.match.params.workoutId;
    return {
        activeWorkoutId: id !== undefined ? parseInt(id, 10) : null,
        pushHistory: router.history.push,
        loggedIn: state.auth.loggedIn,
        workouts: state.workouts.list,
        fetching: state.workouts.fetching,
        error: state.workouts.error,
    }
}
const mapDispatchToProps = {
    showNotification,
    fetchWorkouts
};

Workouts.propTypes = {
    // redux state props
    activeWorkoutId: PropTypes.number,
    pushHistory: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    workouts: PropTypes.array,
    fetching: PropTypes.bool.isRequired,
    error: PropTypes.string,
    // actions
    showNotification: PropTypes.func.isRequired,
    fetchWorkouts: PropTypes.func.isRequired,
    // material
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Workouts));
/*************************** End container *************************/


class CreateNewWorkoutForm extends Component {
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
        }
    }

    render() {
        const { startNew, creating, classes } = this.props;
        return (
            <Grid container direction="column" alignItems="center">
                <form onSubmit={() => startNew(this.state.newWorkoutName)}>
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
                    onClick={() => startNew(this.state.newWorkoutName)}
                    disabled={creating}
                    >
                    Submit
                    </Button>
                </Grid>
                </form>
            </Grid>
        );
    }
};

CreateNewWorkoutForm.propTypes = {
    startNew: PropTypes.func.isRequired,
    creating: PropTypes.bool.isRequired,
};

class WorkoutList extends Component {
    render() {
        if (!this.props.workouts) {
            return <div>loading...</div>
        }
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

