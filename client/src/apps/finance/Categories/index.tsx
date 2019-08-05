import * as React from 'react';
import { createStyles, Theme, Typography } from '@material-ui/core';

import { GetCategoriesData, GetCategoriesQuery } from './queries';
import AddNewCategory from 'apps/finance/Categories/AddNewCategory';
import Grid from '@material-ui/core/Grid';
import { useQuery } from '@apollo/react-hooks';
import client from 'apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      margin: theme.spacing(1),
    },
  })
);
const Categories: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={9} justify="center">
        <Typography className={classes.header} variant="h5">
          Categories
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <AddNewCategory />
      </Grid>
      <Grid item xs={12} justify={'center'}>
        <CategoryList />
      </Grid>
    </Grid>
  );
};

export default Categories;

interface CategoryListProps {}

const CategoryList: React.FunctionComponent<CategoryListProps> = () => {
  const query = useQuery<GetCategoriesData>(GetCategoriesQuery, {
    client,
  });
  if (query.loading) {
    return <CircularProgress />;
  }
  if (query.error) {
    return <>error: ${query.error}</>;
  }
  if (!query.data) {
    return <>No Categories. Why don't you create one?</>;
  }
  return (
    <ul>
      {query.data.getCategories.map(element => (
        <li key={element.id.toString()}>{element.name}</li>
      ))}
    </ul>
  );
};
