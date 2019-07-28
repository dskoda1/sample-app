

import ApolloClient, { gql } from 'apollo-boost';
import { OperationDefinitionNode } from 'graphql';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

client.query({
  query: gql`
  getCategories {
    id
    name
    user {
      username
    }
    subCategories {
      id
      name
      user {
        id
        username
      }
    }
  }
  `
}).then(result => console.log(result));

export default client;