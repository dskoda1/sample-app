import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import {
  withStyles,
  Paper,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import DeleteSet from './DeleteSet';

class SetTable extends Component {
  state = {};

  getTableHeader = () => {
    const { classes } = this.props;
    return this.props.exerciseType === 'cardio' ? (
      <TableRow>
        <TableCell className={classes.tableCell}>Duration</TableCell>
        <TableCell className={classes.tableCell}>Distance</TableCell>
        <TableCell className={classes.tableCell}>At</TableCell>
        <TableCell className={classes.tableCell}>Delete</TableCell>
      </TableRow>
    ) : (
      <TableRow>
        <TableCell className={classes.tableCell}>Weight</TableCell>
        <TableCell className={classes.tableCell}>Reps</TableCell>
        <TableCell className={classes.tableCell}>At</TableCell>
        <TableCell className={classes.tableCell}>Delete</TableCell>
      </TableRow>
    );
  };

  getTableRow = set => {
    const { classes, deleteSet, deletingSet } = this.props;
    if (this.props.exerciseType === 'cardio') {
      return (
        <TableRow key={set.id}>
          <TableCell component="th" scope="row" className={classes.tableCell}>
            {set.duration}
          </TableCell>
          <TableCell align="right" className={classes.tableCell}>
            {set.distance}
          </TableCell>
          <TableCell align="right" className={classes.tableCell}>
            <Moment format="h:mm:ss a">{set.createdAt}</Moment>
          </TableCell>
          <TableCell className={classes.tableCell}>
            <DeleteSet
              deleteSet={() => deleteSet(set.id)}
              deletingSet={deletingSet}
            />
          </TableCell>
        </TableRow>
      );
    } else if (this.props.exerciseType === 'lift') {
      return (
        <TableRow key={set.id}>
          <TableCell component="th" scope="row" className={classes.tableCell}>
            {set.weight}
          </TableCell>
          <TableCell align="right" className={classes.tableCell}>
            {set.reps}
          </TableCell>
          <TableCell align="right" className={classes.tableCell}>
            <Moment format="hh:mm:ss a">{set.createdAt}</Moment>
          </TableCell>
          <TableCell className={classes.tableCell}>
            <DeleteSet
              deleteSet={() => deleteSet(set.id)}
              deletingSet={deletingSet}
            />
          </TableCell>
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
  deleteSet: PropTypes.func.isRequired,
  deletingSet: PropTypes.bool.isRequired,
};

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
    textAlign: 'center',
    overflowX: 'scroll',
  },
  textField: {
    marginTop: theme.spacing(3),
    // marginRight: theme.spacing(1),
    // marginLeft: theme.spacing(1),
    width: '90%',
  },
  button: {
    marginTop: theme.spacing(4),
  },
  tableCell: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2.5),
    textAlign: 'center',
  },
});

export default withStyles(styles)(SetTable);
