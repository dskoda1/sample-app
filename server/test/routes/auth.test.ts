import request from 'supertest';
import session from 'supertest-session';
import { app } from '../../app';
import models from '../../db/models';
import testUtils from '../utils';

describe('Test user endpoints', () => {
  let testSession;
  let user;

  beforeEach(async done => {
    await testUtils.truncateFitnessTables();
    done();
  });

  describe('Register', () => {
    test('400 Username too short', done => {
      request(app)
        .post('/api/auth/register')
        .send({ username: 'ab', password: '123456' })
        .expect(400, done);
    });

    test('400 Password too short', done => {
      request(app)
        .post('/api/auth/register')
        .send({ username: 'abc', password: '12345' })
        .expect(400, done);
    });

    test('201 Creates a new user and sets session', async done => {
      testSession = session(app);
      await testSession
        .post('/api/auth/register')
        .send({ username: 'DWIGHT', password: 'schrutesarethebest' })
        .expect(201, { username: 'dwight' });

      const user = await models.Users.findOne({
        where: { username: 'dwight' },
      });

      await testSession
        .get('/api/auth/profile')
        .expect(200, { username: user.username });

      done();
    });
  });

  describe('Login', () => {
    test('401 Username not found', done => {
      request(app)
        .post('/api/auth/login')
        .send({ username: 'johnny' })
        .expect(401, done);
    });

    test('401 Password mismatch', async done => {
      await session(app)
        .post('/api/auth/register')
        .send({ username: 'superman', password: 'marvel_is_better' })
        .expect(201);

      await session(app)
        .post('/api/auth/login')
        .send({ username: 'superman', password: 'marvel_is_worse' })
        .expect(401);
      done();
    });

    test('202 Success', async done => {
      await session(app)
        .post('/api/auth/register')
        .send({ username: 'SuPerMaN', password: 'marvel_is_better' })
        .expect(201);

      await session(app)
        .post('/api/auth/login')
        .send({ username: 'sUpERmAn', password: 'marvel_is_better' })
        .expect(202);

      done();
    });
  });

  describe('Logout', () => {
    test('200 clears session when logged in', async done => {
      testSession = session(app);
      await testSession
        .post('/api/auth/register')
        .send({ username: 'DWIGHT', password: 'schrutesarethebest' })
        .expect(201, { username: 'dwight' });

      await testSession.post('/api/auth/logout').expect(200);
      // check that session is gone
      await testSession.get('/api/auth/profile').expect(401);
      done();
    });

    test('401 when not logged in', done => {
      return request(app)
        .post('/api/auth/logout')
        .expect(401, done);
    });
  });

  describe('Profile', () => {
    test('200 when logged in', async done => {
      testSession = session(app);
      await testSession
        .post('/api/auth/register')
        .send({ username: 'DWIGHT', password: 'schrutesarethebest' })
        .expect(201, { username: 'dwight' });
      await testSession.get('/api/auth/profile').expect(200);
      done();
    });

    test('401 when not logged in', done => {
      return request(app)
        .get('/api/auth/profile')
        .expect(401, done);
    });
  });
});
