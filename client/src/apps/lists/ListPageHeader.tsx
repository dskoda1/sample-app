import * as React from 'react';
import { createStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSelector } from 'react-redux';
import { AppState } from 'redux/reducers/types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ListType } from './redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme =>
  createStyles({
    header: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    formControl: {
      minWidth: 120,
    },
  })
);

interface ListPageHeader {}

const ListPageHeader: React.FunctionComponent<ListPageHeader> = () => {
  const classes = useStyles();
  const state = useSelector((state: AppState) => state.listState);

  if (state.fetching) {
    return <CircularProgress />;
  }
  if (state.lists.length === 0) {
    return (
      <Typography variant="subtitle1">
        You have no lists. Why not make one now?
      </Typography>
    );
  }
  // const handleSelectedListChange = (
  //   event: React.ChangeEvent<{ value: unknown }>
  // ) => {
  //   const selectedList = state.lists.find(
  //     (list: ListType) => list.id === (event.target.value as number)
  //   );
  //   if (selectedList > -1) {
  //     setActiveListIndex;
  //   }
  //   setActiveListIndex(event.target.value as number);
  // };

  return (
    <Grid container alignItems={'center'}>
      <Grid container>
        <Grid item xs={10}>
          <FormControl className={classes.formControl}>
            <Select
            // value={state.lists[activeListIndex].name}
            // onChange={handleSelectedListChange}
            >
              {state.lists.map((list: ListType, i: number) => (
                <MenuItem value={list.id} key={i}>
                  {list.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <IconButton>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ListPageHeader;
