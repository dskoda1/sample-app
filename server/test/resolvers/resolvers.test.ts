import { gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';

import { ApolloServer, typeDefs, resolvers } from '../../app';
import models from '../../db/models';
import testUtils from '../utils';

const GET_WORKOUTS_WITH_USER = gql`
  query {
    getWorkouts {
      name
      id
      user {
        id
        username
      }
    }
  }
`;

describe('Test graphql endopints endpoints', () => {
  let user = null;
  let testQuery = null;
  let testMutate = null;

  beforeEach(async done => {
    await testUtils.truncateFitnessTables();
    user = await testUtils.createUser('dwight', 'password');
    const context = ({}) => {
      return {
        UserId: user.id,
        models,
      };
    };
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context,
    });

    let { query, mutate } = createTestClient(server);
    testQuery = query;
    testMutate = mutate;
    done();
  });

  describe('test resolvers', () => {
    test('get workouts with user', async done => {
      await testUtils.createWorkout(user.id, 'fake workout');
      await testUtils.createWorkout(user.id, 'fake 2 workout');
      const res = await testQuery({
        query: GET_WORKOUTS_WITH_USER,
      });
      expect(res.data.getWorkouts.length).toEqual(2);
      expect(res.data.getWorkouts[0].user.id).toEqual(user.id);
      done();
    });
  });
});
