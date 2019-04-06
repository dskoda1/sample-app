const request = require('supertest');
const session = require('supertest-session');
const app = require('../../app');
const models = require('../../db/models');

const testUtils = require('../utils');

describe('Test sets endpoints', () => {
  let testSession = null;
  let user = null;
  let workout = null;
  let exercise = null;

  beforeEach(async done => {
    await testUtils.truncateDatabase();
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
    workout = await testUtils.createWorkout(user.id, 'legs');
    liftExercise = await testUtils.createLiftExercise(workout.id, 'squats');
    cardioExercise = await testUtils.createCardioExercise(workout.id, 'bike');
    done();
  });

  describe('POST /', () => {
    test('no session 401', done => {
      return request(app)
        .post('/api/workouts/23/exercises/34/sets')
        .expect(401, done);
    });

    test('400 cardio exercise missing duration/distance', done => {
      return testSession
        .post(`/api/workouts/${workout.id}/exercises/${cardioExercise.id}/sets`)
        .expect(400, done);
    });

    test('400 lift exercise missing weights/reps', done => {
      return testSession
        .post(`/api/workouts/${workout.id}/exercises/${liftExercise.id}/sets`)
        .expect(400, done);
    });

    test('424 when exercise not valid type', async done => {
      const badExercise = await testUtils.createExercise(
        workout.id,
        'invalid exercise',
        'invalid type'
      );

      await testSession
        .post(`/api/workouts/${workout.id}/exercises/${badExercise.id}/sets`)
        .expect(424);
      done();
    });

    test('201 valid body for cardio', async done => {
      const res = await testSession
        .post(`/api/workouts/${workout.id}/exercises/${cardioExercise.id}/sets`)
        .send({ duration: 28, distance: 2.7 })
        .expect(201);

      const set = await models.Sets.findOne({ where: { id: res.body.id } });
      expect(set.id).toEqual(res.body.id);
      expect(set.duration).toBe(28);
      expect(set.distance).toBe(2.7);
      done();
    });

    test('201 valid body for lift', async done => {
      const res = await testSession
        .post(`/api/workouts/${workout.id}/exercises/${liftExercise.id}/sets`)
        .send({ weight: 135, reps: 8 })
        .expect(201);

      const set = await models.Sets.findOne({ where: { id: res.body.id } });
      expect(set.id).toEqual(res.body.id);
      expect(set.weight).toEqual(135);
      expect(set.reps).toEqual(8);
      done();
    });

    test('201 lift accepts 0 for weight', async done => {
      const res = await testSession
        .post(`/api/workouts/${workout.id}/exercises/${liftExercise.id}/sets`)
        .send({ weight: 0, reps: 8 })
        .expect(201);

      const set = await models.Sets.findOne({ where: { id: res.body.id } });
      expect(set.id).toEqual(res.body.id);
      expect(set.weight).toEqual(0);
      expect(set.reps).toEqual(8);
      done();
    });
  });

  describe('DELETE /:id', () => {
    test('no session 401', done => {
      return request(app)
        .delete('/api/workouts/23/exercises/34/sets/23')
        .expect(401, done);
    });

    test('Set not owned by user', async done => {
      const otherUser = await testUtils.createUser('jim', 'b');
      const otherWorkout = await testUtils.createWorkout(otherUser.id, 'arms');
      const otherExercise = await testUtils.createLiftExercise(
        otherWorkout.id,
        'curls'
      );
      const otherSet = await testUtils.createLiftSet(
        otherExercise.id,
        100,
        100
      );
      await testSession
        .delete(
          `/api/workouts/${workout.id}/exercises/${liftExercise.id}/sets/${
            otherSet.id
          }`
        )
        .expect(404);
      done();
    });
  });
});
