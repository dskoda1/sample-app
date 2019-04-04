import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Paper,
  Typography,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';

class SetTable extends Component {
  state = {};

  getTableHeader = () => {
    return this.props.exerciseType === 'cardio' ? (
      <TableRow>
        <TableCell>Duration</TableCell>
        <TableCell>Distance</TableCell>
      </TableRow>
    ) : (
      <TableRow>
        <TableCell>Weight</TableCell>
        <TableCell>Reps</TableCell>
      </TableRow>
    );
  };

  getTableRow = set => {
    if (this.props.exerciseType === 'cardio') {
      return (
        <TableRow key={set.id}>
          <TableCell component="th" scope="row">
            {set.duration}
          </TableCell>
          <TableCell align="right">{set.distance}</TableCell>
        </TableRow>
      );
    } else if (this.props.exerciseType === 'lift') {
      return (
        <TableRow key={set.id}>
          <TableCell component="th" scope="row">
            {set.weight}
          </TableCell>
          <TableCell align="right">{set.reps}</TableCell>
        </TableRow>
      );
    }
  };

  render() {
    const { classes, sets } = this.props;
    return (
      <Paper className={classes.root} elevation={1}>
        <Grid container justify="flex-start">
          <Table>
            <TableHead>{this.getTableHeader()}</TableHead>
            <TableBody>{sets.map(set => this.getTableRow(set))}</TableBody>
          </Table>
        </Grid>
      </Paper>
    );
  }
}

SetTable.propTypes = {
  exerciseType: PropTypes.string.isRequired,
  sets: PropTypes.array.isRequired,
};

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
    textAlign: 'center',
  },
  textField: {
    marginTop: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit,
    // marginLeft: theme.spacing.unit,
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit * 4,
  },
});

export default withStyles(styles)(SetTable);
