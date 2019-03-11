const request = require('supertest');
const session = require('supertest-session');
const app = require('../../app');
const models = require('../../db/models');

const testUtils = require('../utils');

describe('Test workout endpoints', () => {
  let testSession = null;
  let user = null;
  beforeEach(async done => {
    await testUtils.truncateDatabase();
    testSession = session(app);
    await testSession
      .post('/api/auth/register')
      .send({ username: 'dwight', password: 'ilovebeets' })
      .expect(201, { username: 'dwight' });
    user = await models.Users.findOne({ where: { username: 'dwight' } });
    done();
  });

  describe('POST /', () => {
    test('no session 401', done => {
      return request(app)
        .post('/api/workouts')
        .expect(401, done);
    });

    test('name less than 3 characters', done => {
      return testSession
        .post('/api/workouts')
        .send({ name: 'ab' })
        .expect(400, done);
    });

    test('success 202', async done => {
      await testSession
        .post('/api/workouts')
        .send({ name: 'full body' })
        .expect(201);
      await user.reload();
      const workouts = await user.getWorkouts();
      expect(workouts.length).toBe(1);
      expect(workouts[0].name).toBe('full body');
      done();
    });
  });

  describe('GET /', () => {
    test('no session 401', done => {
      return request(app)
        .get('/api/workouts')
        .expect(401, done);
    });

    test('success 202', async done => {
      // Create some workouts for our test user
      await testUtils.createWorkout(user.id, 'back and bis');
      await testUtils.createWorkout(user.id, 'cardio');
      await testUtils.createWorkout(user.id, 'legs');

      // And a workout for another user to test its not returned
      const otherUser = await testUtils.createUser('jim', 'b');
      await testUtils.createWorkout(otherUser.id, 'legs');

      const res = await testSession.get('/api/workouts').expect(200);
      expect(res.body.workouts.length).toBe(3);
      workout = res.body.workouts[0];
      expect(workout).toHaveProperty('id');
      expect(workout).toHaveProperty('name');
      expect(workout).toHaveProperty('createdAt');
      expect(workout).toHaveProperty('updatedAt');
      expect(workout).toHaveProperty('finishedAt');
      done();
    });
  });

  describe('GET /:id', () => {
    test('200 success includes exercises & sets', async done => {
      const workout = await testUtils.createWorkout(user.id, 'chest');
      const squats = await testUtils.createExercise(
        workout.id,
        'squats',
        'lift'
      );
      await testUtils.createLiftSet(squats.id, 135, 10);
      await testUtils.createLiftSet(squats.id, 135, 10);
      await testUtils.createLiftSet(squats.id, 135, 10);
      const res = await testSession
        .get(`/api/workouts/${workout.id}`)
        .expect(200);
      expect(res.body.workout.id).toBe(workout.id);
      expect(res.body.workout.name).toBe(workout.name);
      expect(res.body.workout.exercises.length).toBe(1);
      expect(res.body.workout.exercises[0].sets.length).toBe(3);
      done();
    });

    test('GET /:id not owner 404', async done => {
      const otherUser = await testUtils.createUser('jim', 'b');
      const workout = await testUtils.createWorkout(otherUser.id, 'legs');

      await testSession.get(`/api/workouts/${workout.id}`).expect(404);
      done();
    });

    test('GET /:id not found 404', done => {
      return testSession.get('/api/workouts/23').expect(404, done);
    });

    test('GET /:id with no session 401', done => {
      return request(app)
        .get('/api/workouts/23')
        .expect(401, done);
    });
  });

  describe('PUT /:id', () => {
    test('when finished=true', async done => {
      let workout = await testUtils.createWorkout(user.id, 'legs');
      expect(workout.finishedAt).toBeNull();
      await testSession
        .put(`/api/workouts/${workout.id}`)
        .send({ finished: true })
        .expect(202);
      await workout.reload();
      expect(workout.finishedAt).toBeDefined();
      done();
    });

    test('when name is defined', async done => {
      let workout = await testUtils.createWorkout(user.id, 'legs');
      await testSession
        .put(`/api/workouts/${workout.id}`)
        .send({ name: 'legs and abs' })
        .expect(202);
      await workout.reload();
      expect(workout.name).toBe('legs and abs');
      done();
    });
  });
});
