import ApolloClient from 'apollo-boost';
import DefaultClient from 'apollo-boost';

const client: DefaultClient<any> = new ApolloClient({
  uri: `/graphql`,
  credentials: 'include',
});

export default client;
