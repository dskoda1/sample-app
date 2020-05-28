import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import { AppState } from 'redux/reducers/types';
import ListView from 'apps/lists/ListView';

interface ListPageProps {}

const ListsView: React.FunctionComponent<ListPageProps> = () => {
  const state = useSelector((state: AppState) => state.listState);
  if (!state.lists) {
  }
  return (
    <Grid container alignItems={'center'}>
      <Grid item xs={12}>
        {state.lists ? <ListView list={state.lists[0]} /> : null}
      </Grid>
    </Grid>
  );
};

export default ListsView;
