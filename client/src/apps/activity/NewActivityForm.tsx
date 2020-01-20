import * as React from 'react';
import {
  createStyles,
  Divider,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useEffect, useState } from 'react';
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
      minWidth: '100px',
    },
    advancedOptionsGrid: {
      marginTop: theme.spacing(3),
    },
    advancedOptionsSummaryPanel: {
      style: 'flex',
      justify: 'center',
    },
    advancedOptionsDetailsPanel: {
      marginTop: -theme.spacing(3),
    },
    textField: {
      marginTop: theme.spacing(3),
    },
    title: {
      marginTop: theme.spacing(3),
    },
  })
);

interface NewActivityFormProps {}

const NewActivityForm: React.FunctionComponent<NewActivityFormProps> = () => {
  const classes = useStyles();

  const activityState = useSelector((state: AppState) => state.activityState);

  const [selectedActivityType, setSelectedActivityType] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<MaterialUiPickersDate>(null);
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [isAdvancedPanelExpanded, setAdvancePanelExpanded] = useState<boolean>(
    false
  );

  const tags = activityState.tags.map((tag: Tag) => tag.name);
  const activityTypes = activityState.activityTypes.map(
    (type: ActivityType) => type.name
  );

  // Below is an example of useEffect for listening to prop changes
  const [isPosting, setStatePosting] = useState(activityState.postingActivity);
  useEffect(() => {
    if (isPosting && !activityState.postingActivity) {
      setSelectedActivityType('');
      setSelectedTag('');
      setSelectedDate(null);
      setSelectedDuration('');
      setAdvancePanelExpanded(false);
    }
    setStatePosting(activityState.postingActivity);
  }, [
    activityState.postingActivity,
    isPosting,
    setSelectedActivityType,
    setSelectedTag,
    setStatePosting,
    setSelectedDate,
    setSelectedDuration,
  ]);

  const dispatch = useDispatch();
  if (activityState.postingActivity) {
    return <CircularProgress size={50} />;
  }

  // Get all activity that matches the selected activity type, cast it to a set to
  // get unique values
  const uniqueMatchingTags = new Set(
    activityState.activity
      .filter(activity => activity.ActivityType.name === selectedActivityType)
      .map(activity => activity.Tag.name)
  );
  // Get the remaining tags that have not been used for this and sort them
  const otherTags = tags.filter(tag => !uniqueMatchingTags.has(tag)).sort();
  // Finally, we can concat them all together
  const overallTagList = Array.from(uniqueMatchingTags)
    .sort()
    .concat(otherTags);

  return (
    <Grid container justify={'space-around'}>
      <Grid item xs={10}>
        <Autocomplete
          id="activity-types-autocomplete"
          freeSolo
          options={activityTypes}
          getOptionLabel={(option: string) => option}
          onInputChange={(event: any, newValue: string | undefined) => {
            if (!newValue) {
              newValue = '';
            }
            setSelectedActivityType(newValue);
          }}
          renderInput={params => (
            <TextField
              {...params}
              required
              label="Name"
              margin="normal"
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid item xs={10}>
        <Autocomplete
          id="activity-tag-autocomplete"
          freeSolo
          options={overallTagList}
          getOptionLabel={(option: string) => option}
          groupBy={(option: string) =>
            uniqueMatchingTags.has(option) ? 'Common' : 'Other'
          }
          disabled={!selectedActivityType}
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

      <Grid item xs={11} className={classes.advancedOptionsGrid}>
        <ExpansionPanel
          expanded={isAdvancedPanelExpanded}
          onChange={() => setAdvancePanelExpanded(!isAdvancedPanelExpanded)}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.advancedOptionsSummaryPanel}
          >
            <Typography>Advanced</Typography>
            <Divider />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            className={classes.advancedOptionsDetailsPanel}
          >
            <Grid container>
              <Grid item xs={12}>
                <DateTimePicker
                  fullWidth
                  value={selectedDate}
                  onChange={date => setSelectedDate(date)}
                  label={'Timestamp'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  fullWidth
                  label={'Duration'}
                  value={selectedDuration ? parseInt(selectedDuration) : ''}
                  onChange={e =>
                    e.target.value && setSelectedDuration(e.target.value)
                  }
                  inputProps={{ pattern: '[0-9]*' }}
                  type={'number'}
                />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            dispatch(
              postActivity(
                selectedActivityType as string,
                selectedTag as string,
                selectedDate ? selectedDate.toString() : '',
                parseInt(selectedDuration)
              )
            );
          }}
          disabled={!selectedActivityType}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewActivityForm;
