import * as React from 'react';
import { createStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/types';
import { ActivityType, Tag } from './redux';
import Autocomplete from '@material-ui/lab/Autocomplete';

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

interface NewActivityFormProps {}

const NewActivityForm: React.FunctionComponent<NewActivityFormProps> = () => {
  const classes = useStyles();
  const activityState = useSelector((state: AppState) => state.activityState);

  const [selectedTag, setSelectedTag] = useState<string>();
  const tags = activityState.tags.map((tag: Tag) => tag.name);
  const [selectedActivityType, setSelectedActivityType] = useState<string>();
  const activityTypes = activityState.activityTypes.map(
    (type: ActivityType) => type.name
  );
  console.log(selectedTag);
  console.log(selectedActivityType);

  return (
    <Grid container>
      <Grid item xs={9}>
        <Autocomplete
          id="activity-tag-autocomplete"
          freeSolo
          options={tags}
          getOptionLabel={(option: string) => option}
          onChange={(event: any, newValue: string | undefined) => {
            setSelectedTag(newValue);
          }}
          renderInput={params => (
            <TextField
              {...params}
              label="Search or create new Tag"
              margin="normal"
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid item xs={9}>
        <Autocomplete
          id="activity-types-autocomplete"
          freeSolo
          options={activityTypes}
          getOptionLabel={(option: string) => option}
          onChange={(event: any, newValue: string | undefined) => {
            setSelectedActivityType(newValue);
          }}
          renderInput={params => (
            <TextField
              {...params}
              label="Search or create Activity Types"
              margin="normal"
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          // onClick={this.submitCreate}
          // disabled={creating || !canCreate}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewActivityForm;
