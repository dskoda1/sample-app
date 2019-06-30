const app = require('./app');
const models = require('./db/models');

const testUtils = require('./test/utils');

const { gql } = require('apollo-server-express')
const { createTestClient } = require('apollo-server-testing');

const {
  gqlServer,
} = require('./app');


describe('Test graphql endopints endpoints', () => {
  let testSession = null;
  let user = null;
  let workout = null;
  let query = null;
  let mutate = null;

  beforeEach( async done => {
    const { query, mutate } = createTestClient(gqlServer);
    done();
  })

  describe('test resolvers', () => {
    test('something', () => {
        expect(1).toEqual(1);
    })
  })
});
