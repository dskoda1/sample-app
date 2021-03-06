import * as React from 'react';
import { createStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createListItem } from './redux';

const useStyles = makeStyles(theme =>
  createStyles({
    button: {
      marginTop: theme.spacing(4),
    },
    textField: {
      marginTop: theme.spacing(3),
      width: '90%',
    },
  })
);

interface ListViewProps {
  name: string;
}

const ListItemForm: React.FunctionComponent<ListViewProps> = ({ name }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [newListItemText, onChange] = useState('');

  return (
    <Grid container>
      <Grid item xs={9}>
        <TextField
          label={`Add to ${name}`}
          value={newListItemText}
          onChange={e => onChange(e.target.value)}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => dispatch(createListItem(newListItemText))}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default ListItemForm;
