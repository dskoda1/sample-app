import * as React from 'react';
import {
  createStyles,
  Typography,
  List,
  ListItemText,
  ListItem,
  Divider,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ListType } from 'apps/lists/redux';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import ListItemForm from './ListItemForm';

const useStyles = makeStyles(theme =>
  createStyles({
    list: {
      flexGrow: 1,
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
        {list.items.map(listItem => (
          <ListItem>
            <Divider />
            <Grid container xs={5} justify={'flex-start'}>
              <Typography variant="subtitle1">{listItem.text}</Typography>
            </Grid>
            <Grid container xs={7} justify={'flex-end'}>
              <IconButton className={classes.icon}>
                <CheckIcon />
              </IconButton>
              <IconButton className={classes.icon}>
                <ArrowUpwardIcon />
              </IconButton>
              <IconButton className={classes.icon}>
                <ArrowDownwardIcon />
              </IconButton>
              <IconButton className={classes.icon}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default ListView;
