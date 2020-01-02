import * as React from 'react';
import { createStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'redux/reducers/types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useEffect, useState } from 'react';
import { fetchLists, ListType } from './redux';
import ListView from 'apps/lists/ListView';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

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

interface ListPageProps {}

const ListsView: React.FunctionComponent<ListPageProps> = () => {
  const classes = useStyles();
  const state = useSelector((state: AppState) => state.listState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLists());
  }, [useDispatch]);

  // List select state
  const [activeListIndex, setActiveListIndex] = useState(0);

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
    <Grid container justify={'center'} direction={'row'} spacing={3}>
      <Grid container xs={12}>
        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <Typography variant="subtitle1">Select a list</Typography>
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
        <Grid item xs={6}>
          <Typography variant="subtitle1">Create a list</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ListView list={state.lists[0]} />
      </Grid>
    </Grid>
  );
};

export default ListsView;
