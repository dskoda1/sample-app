import * as React from 'react';
import { createStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'redux/reducers/types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useEffect } from 'react';
import { fetchLists } from './redux';

const useStyles = makeStyles(theme =>
  createStyles({
    header: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
  })
);

interface ListPageProps {}

const ListsView: React.FunctionComponent<ListPageProps> = () => {
  const _ = useStyles();
  const state = useSelector((state: AppState) => state.listState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLists());
  }, [useDispatch]);
  if (state.fetching) {
    return <CircularProgress />;
  }
  return (
    <Grid container justify={'center'} direction={'row'} spacing={3}>
      <Grid item xs={12}>
        here be lists
      </Grid>
    </Grid>
  );
};

export default ListsView;
