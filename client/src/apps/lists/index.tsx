import * as React from 'react';
import { createStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListsView from './ListsView';
import { useDispatch, useSelector } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import { useEffect } from 'react';
import { fetchLists } from './redux';
import ListPageHeader from './ListPageHeader';
import { AppState } from '../../redux/reducers/types';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    header: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
  })
);

interface ListPageProps {}

const ListPage: React.FunctionComponent<ListPageProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);
  const state = useSelector((state: AppState) => state.listState);

  if (state.fetching) {
  }
  return (
    <div className={classes.root}>
      <Grid container alignItems={'center'} spacing={3}>
        <Grid item xs={12} className={classes.header}>
          <Typography variant="h2">Lists</Typography>
        </Grid>
        <Grid item xs={12} md={10}>
          <Paper className={classes.paper}>
            {state.fetching ? (
              <CircularProgress />
            ) : (
              <>
                <ListPageHeader />
                <Divider variant="middle" />
                <ListsView />
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ListPage;
