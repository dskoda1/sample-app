import request from 'supertest';
import session from 'supertest-session';
import { app } from '../../app';
import models from '../../db/models';
import testUtils from '../utils';

describe('Test exercise endpoints', () => {
  let testSession = null;
  let user = null;
  let workout = null;

  beforeEach(async done => {
    await testUtils.truncateFitnessTables();
    testSession = session(app);
    await testSession
      .post('/api/auth/register')
      .send({ username: 'dwight', password: 'ilovebeets' })
      .expect(201, { username: 'dwight' });
    user = await models.Users.findOne({ where: { username: 'dwight' } });
    if (!user) {
      throw Error('Failed to get user');
    }
    let workoutId;
    await testSession
      .post('/api/workouts')
      .send({ name: 'legs' })
      .expect(201);
    workout = await models.Workouts.findOne({ where: { name: 'legs' } });
    done();
  });

  describe('POST /', () => {
    test('no session 401', done => {
      return request(app)
        .post('/api/workouts/23/exercises')
        .expect(401, done);
    });

    test('400 Name less than 3 characters', done => {
      return testSession
        .post(`/api/workouts/${workout.id}/exercises`)
        .send({ name: 'av', type: 'lift' })
        .expect(400, done);
    });

    test('404 Workout does not exist', done => {
      return testSession
        .post('/api/workouts/848/exercises')
        .send({ name: 'squat', type: 'cardio' })
        .expect(404, done);
    });

    test('404 Workout owned by another user', async done => {
      const otherUser = await testUtils.createUser('jim', 'b');
      const otherWorkout = await testUtils.createWorkout(otherUser.id, 'legs');

      await testSession
        .post(`/api/workouts/${otherWorkout.id}/exercises`)
        .send({ name: 'squat', type: 'cardio' })
        .expect(404);
      done();
    });

    test('400 Type not one of valid options', done => {
      return testSession
        .post(`/api/workouts/${workout.id}/exercises`)
        .send({ name: 'squat', type: 'foobar' })
        .expect(400, done);
    });

    test('201 Valid type: lift', done => {
      return testSession
        .post(`/api/workouts/${workout.id}/exercises`)
        .send({ name: 'squat', type: 'lift' })
        .expect(201, done);
    });

    test('201 Valid type: cardio', done => {
      return testSession
        .post(`/api/workouts/${workout.id}/exercises`)
        .send({ name: 'squat', type: 'cardio' })
        .expect(201, done);
    });
  });

  describe('GET /', () => {
    test('401 No session', done => {
      return request(app)
        .get(`/api/workouts/${workout.id}/exercises`)
        .expect(401, done);
    });
    test('202 Success', async done => {
      // Create some exercises for our test user
      const cardio = await testUtils.createExercise(
        workout.id,
        'bike',
        'cardio'
      );
      const press = await testUtils.createExercise(
        workout.id,
        'shoulder press',
        'lift'
      );

      // And a workout for another user to test its not returned
      const otherUser = await testUtils.createUser('jim', 'b');
      const otherWorkout = await testUtils.createWorkout(otherUser.id, 'arms');
      const otherExercise = await testUtils.createExercise(
        otherWorkout.id,
        'curls',
        'lift'
      );

      const res = await testSession
        .get(`/api/workouts/${workout.id}/exercises`)
        .expect(200);
      expect(res.body.exercises.length).toBe(2);
      const exercise = res.body.exercises[0];
      expect(exercise).toHaveProperty('id');
      expect(exercise).toHaveProperty('name');
      expect(exercise).toHaveProperty('type');
      expect(exercise).toHaveProperty('createdAt');
      done();
    });
  });

  describe('GET /:id', () => {
    test('200 Success', async done => {
      const exercise = await testUtils.createExercise(
        workout.id,
        'squat',
        'lift'
      );
      const res = await testSession
        .get(`/api/workouts/${workout.id}/exercises/${exercise.id}`)
        .expect(200);
      expect(res.body.exercise.id).toBe(exercise.id);
      expect(res.body.exercise.name).toBe(exercise.name);
      expect(res.body.exercise.type).toBe(exercise.type);
      done();
    });

    test('404 wrong workout', async done => {
      const otherUser = await testUtils.createUser('jim', 'b');
      const otherWorkout = await testUtils.createWorkout(otherUser.id, 'legs');
      const otherExercise = await testUtils.createExercise(
        otherWorkout.id,
        'curls',
        'lift'
      );

      await testSession
        .get(`/api/workouts/${workout.id}/exercises/${otherExercise.id}`)
        .expect(404);
      done();
    });

    test('404 not found', async done => {
      await testSession
        .get(`/api/workouts/${workout.id}/exercises/534`)
        .expect(404);
      done();
    });

    test('GET /:id with no session 401', done => {
      return request(app)
        .get(`/api/workouts/${workout.id}/exercises/234`)
        .expect(401, done);
    });
  });

  describe('DELETE /:id', () => {
    test('202 Success', async done => {
      // Create an exercise to delete
      const exercise = await testUtils.createExercise(
        workout.id,
        'bike',
        'cardio'
      );

      await testSession
        .delete(`/api/workouts/${workout.id}/exercises/${exercise.id}`)
        .expect(202);

      done();
    });

    test('404 Not found', done => {
      return testSession
        .delete(`/api/workouts/${workout.id}/exercises/23432`)
        .expect(404, done);
    });

    test('401 Not Authorized', async done => {
      // Create some exercises for our test user
      const exercise = await testUtils.createExercise(
        workout.id,
        'bike',
        'cardio'
      );
      await request(app)
        .delete(`/api/workouts/${workout.id}/exercises/${exercise.id}`)
        .expect(401);
      done();
    });
  });

  describe('PUT /:id', () => {
    test('202 Name changed', async done => {
      const exercise = await testUtils.createExercise(
        workout.id,
        'squat',
        'lift'
      );
      await testSession
        .put(`/api/workouts/${workout.id}/exercises/${exercise.id}`)
        .send({ name: 'goblet squats' })
        .expect(202);
      await exercise.reload();
      expect(exercise.name).toBe('goblet squats');
      done();
    });

    test('400 Name less than 3 chars', async done => {
      const exercise = await testUtils.createExercise(
        workout.id,
        'squat',
        'lift'
      );
      await testSession
        .put(`/api/workouts/${workout.id}/exercises/${exercise.id}`)
        .send({ name: 'sd' })
        .expect(400);
      done();
    });
  });
});
