import * as React from 'react';
import { Typography } from '@material-ui/core';

import { Category, GetCategoriesData, GetCategoriesQuery } from './queries';
import { ChildDataProps, graphql } from 'react-apollo';
import { ApolloError } from 'apollo-client/errors/ApolloError';

type ChildProps = ChildDataProps<{}, GetCategoriesData>;
const withCategories = graphql<{}, GetCategoriesData, {}, ChildProps>(
  GetCategoriesQuery
);

const Categories: React.ComponentClass = withCategories(props => {
  return (
    <>
      <Typography variant="h5">Categories</Typography>
      <CategoryList
        loading={props.data.loading}
        error={props.data.error}
        data={props.data.getCategories || []}
      />
    </>
  );
});

export default Categories;

interface CategoryListProps {
  loading: boolean;
  error?: ApolloError;
  data: Array<Category>;
}

const CategoryList: React.FunctionComponent<CategoryListProps> = props => {
  if (props.loading) {
    return <div>"loading"</div>;
  }
  if (props.error) {
    return <>"error"</>;
  }
  return (
    <ul>
      {props.data.map(element => (
        <li>{element.name}</li>
      ))}
    </ul>
  );
};
