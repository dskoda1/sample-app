import * as React from 'react';
import { createStyles, Typography, List, Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ListType } from 'apps/lists/redux';
import ListItemForm from './ListItemForm';
import ListItemView from './ListItemView';

const useStyles = makeStyles(theme =>
  createStyles({
    list: {
      flexGrow: 1,
      marginTop: '10px',
    },
    icon: {
      margin: '-5px',
    },
  })
);

interface ListViewProps {
  list: ListType;
}

const ListView: React.FunctionComponent<ListViewProps> = ({ list }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5">{list.name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <ListItemForm name={list.name} />
      </Grid>
      <List className={classes.list}>
        <Divider />

        {list.items.map(listItem => (
          <ListItemView key={listItem.id} listItem={listItem} />
        ))}
      </List>
    </Grid>
  );
};

export default ListView;
