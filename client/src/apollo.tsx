import ApolloClient from 'apollo-boost';
import DefaultClient from 'apollo-boost';

const client: DefaultClient<any> = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include',
});

export default client;
