import * as React from 'react';
import {
  createStyles,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../redux/reducers/types';
import { ActivityType, Tag } from './redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { postActivity } from './redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DateTimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { ExpansionPanel } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme =>
  createStyles({
    button: {
      marginTop: theme.spacing(4),
    },
    textField: {
      marginTop: theme.spacing(3),
      width: '90%',
    },
    timestampGrid: {
      marginTop: theme.spacing(2),
      textAlignt: 'center',
    },
    advancedHeading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
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
  const [selectedDate, handleDateChange] = useState<MaterialUiPickersDate>(
    null
  );
  if (selectedDate) {
    console.log(selectedDate.toDate());
  }
  console.log(new Date());
  const dispatch = useDispatch();
  if (activityState.fetching) {
    return <CircularProgress />;
  }
  // @ts-ignore
  return (
    <Grid container>
      <Grid item xs={12}>
        <Autocomplete
          id="activity-types-autocomplete"
          freeSolo
          options={activityTypes}
          getOptionLabel={(option: string) => option}
          onInputChange={(event: any, newValue: string | undefined) => {
            if (newValue === undefined) {
              newValue = '';
            }
            setSelectedActivityType(newValue);
          }}
          renderInput={params => (
            <TextField {...params} label="Name" margin="normal" fullWidth />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          id="activity-tag-autocomplete"
          freeSolo
          options={tags}
          getOptionLabel={(option: string) => option}
          onInputChange={(event: any, newValue: string | undefined) => {
            if (newValue === undefined) {
              newValue = '';
            }
            setSelectedTag(newValue);
          }}
          renderInput={params => (
            <TextField {...params} label="Tag" margin="normal" fullWidth />
          )}
        />
      </Grid>
      <Grid item xs={12} className={classes.timestampGrid}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.advancedHeading}>
              Advanced
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <DateTimePicker
              fullWidth
              value={selectedDate}
              onChange={date => handleDateChange(date)}
              label={'Timestamp (optional)'}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() =>
            dispatch(
              postActivity(
                selectedActivityType as string,
                selectedTag as string
              )
            )
          }
          disabled={!selectedActivityType}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewActivityForm;
