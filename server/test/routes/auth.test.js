const request = require('supertest');
const app = require('../../app');
const models = require('../../db/models');
const testUtils = require('../utils');

describe('Test user endpoints', () => {
  beforeEach(async done => {
    await testUtils.truncateDatabase();
    done();
  });
  test('/register creates a new user', done => {
    return request(app)
      .post('/api/auth/register')
      .send({ username: 'dwight', password: 'schrutesarethebest' })
      .expect(200, { username: 'dwight' }, done);
  });
});
