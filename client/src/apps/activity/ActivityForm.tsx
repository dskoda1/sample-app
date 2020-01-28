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
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/types';
import { ActivityType, FlatActivity, Tag } from './redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DateTimePicker } from '@material-ui/pickers';
import { ExpansionPanel } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      style: 'flex',
      justifyContent: 'center',
    },
    buttonGrid: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(2),
    },
    advancedOptionsGrid: {
      marginTop: theme.spacing(4),
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

interface NewActivityFormProps {
  submitActivity: (activity: FlatActivity) => void;
  item: FlatActivity;
  disableSubmit?: boolean;
}

const ActivityForm: React.FunctionComponent<NewActivityFormProps> = ({
  submitActivity,
  item,
  disableSubmit = false,
}) => {
  const classes = useStyles();
  const activityState = useSelector((state: AppState) => state.activityState);
  const [selectedActivityType, setSelectedActivityType] = useState<string>(
    item.activityTypeName
  );

  const [selectedTag, setSelectedTag] = useState<string>(item.tagName);
  const [selectedDate, setSelectedDate] = useState<string>(item.timestamp);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(
    item.duration ? `${item.duration}` : null
  );
  const [isAdvancedPanelExpanded, setAdvancePanelExpanded] = useState<boolean>(
    false
  );
  console.log(selectedActivityType);
  console.log(selectedTag);
  const tags = activityState.tags.map((tag: Tag) => tag.name);
  const activityTypes = activityState.activityTypes.map(
    (type: ActivityType) => type.name
  );

  // Get all activity that matches the selected activity type, cast it to a set to
  // get unique values
  const uniqueMatchingTags = new Set(
    activityState.activity
      .filter(activity => activity.ActivityType.name === selectedActivityType)
      .filter(activity => activity.Tag.name !== 'none')
      .map(activity => activity.Tag.name)
  );
  // Get the remaining tags that have not been used for this and sort them
  const otherTags = tags.filter(tag => !uniqueMatchingTags.has(tag)).sort();
  // Finally, we can concat them all together
  const overallTagList = Array.from(uniqueMatchingTags)
    .sort()
    .concat(otherTags);

  return (
    <>
      <Grid item xs={12}>
        <Autocomplete
          id="activity-types-autocomplete"
          freeSolo
          options={activityTypes}
          getOptionLabel={(option: string) => option}
          value={selectedActivityType}
          onChange={(event: any, newValue: string | undefined) => {
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
      <Grid item xs={12}>
        <Autocomplete
          id="activity-tag-autocomplete"
          freeSolo
          options={overallTagList}
          getOptionLabel={(option: string) => option}
          groupBy={(option: string) =>
            uniqueMatchingTags.has(option) ? 'Common' : 'Other'
          }
          disabled={!selectedActivityType}
          value={selectedTag}
          onChange={(event: any, newValue: string | undefined) => {
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

      <Grid item xs={12} className={classes.advancedOptionsGrid}>
        <ExpansionPanel
          expanded={isAdvancedPanelExpanded}
          onChange={() => setAdvancePanelExpanded(!isAdvancedPanelExpanded)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
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
                  value={selectedDate ? selectedDate : null}
                  onChange={date =>
                    setSelectedDate(date ? date.toString() : '')
                  }
                  label={'Timestamp'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  fullWidth
                  label={'Duration'}
                  value={selectedDuration ? parseInt(selectedDuration) : ''}
                  onChange={e => setSelectedDuration(e.target.value)}
                  inputProps={{ pattern: '[0-9]*' }}
                  type={'number'}
                />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
      <Grid item xs={12} className={classes.buttonGrid}>
        {disableSubmit ? (
          <CircularProgress size={35} />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              submitActivity({
                id: item.id,
                activityTypeName: selectedActivityType as string,
                tagName: selectedTag as string,
                timestamp: selectedDate ? selectedDate.toString() : '',
                duration: selectedDuration ? parseInt(selectedDuration) : 0,
              });
            }}
            disabled={!selectedActivityType || disableSubmit}
          >
            Submit
          </Button>
        )}
      </Grid>
    </>
  );
};

export default ActivityForm;
