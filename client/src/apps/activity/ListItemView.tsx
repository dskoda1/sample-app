import * as React from 'react';
import { createStyles, Typography, ListItem, Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ListItemType } from 'apps/lists/redux';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';

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

interface ListItemProps {
  listItem: ListItemType;
}

const ListItemView: React.FunctionComponent<ListItemProps> = ({ listItem }) => {
  const classes = useStyles();
  return (
    <>
      <ListItem>
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
      <Divider />
    </>
  );
};

export default ListItemView;
