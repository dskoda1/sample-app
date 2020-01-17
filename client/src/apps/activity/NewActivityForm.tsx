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
  const [isPosting, setStatePosting] = useState(activityState.postingActivity);

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
    setStatePosting,
    setSelectedTag,
    setSelectedActivityType,
    setSelectedDate,
    setSelectedDuration,
  ]);

  const dispatch = useDispatch();
  if (activityState.fetching && !activityTypes) {
    return <CircularProgress />;
  }
  return (
    <Grid container justify={'space-around'}>
      <Grid item xs={12} className={classes.title}>
        <Typography variant="h5">Record Activity</Typography>
      </Grid>
      <Grid item xs={10}>
        <Autocomplete
          id="activity-types-autocomplete"
          freeSolo
          value={selectedActivityType}
          options={activityTypes}
          getOptionLabel={(option: string) => option}
          disabled={activityState.postingActivity}
          onInputChange={(event: any, newValue: string | undefined) => {
            if (newValue === undefined) {
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
          options={tags}
          getOptionLabel={(option: string) => option}
          value={selectedTag}
          disabled={activityState.postingActivity}
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
                  disabled={activityState.postingActivity}
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
                  disabled={activityState.postingActivity}
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
          disabled={!selectedActivityType || activityState.postingActivity}
        >
          {activityState.postingActivity ? (
            <CircularProgress size={22} />
          ) : (
            'Submit'
          )}
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewActivityForm;
