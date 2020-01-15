import request from 'supertest';
import session from 'supertest-session';
import { app } from '../../app';
import models from '../../db/models';
import testUtils from '../utils';

describe('Test activity endpoints', () => {
  let testSession = null;
  let user = null;
  beforeEach(async done => {
    await testUtils.truncateActivityTables();
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
        .post('/api/activity')
        .expect(401, done);
    });

    test('Can use tag / activity type name of already created entities', async done => {
      const activityType = await testUtils.createActivityType(
        user.id,
        'shopping'
      );
      const tag = await testUtils.createTag(user.id, 'groceries', 'activity');
      await testSession
        .post('/api/activity')
        .send({ tagName: tag.name, activityTypeName: activityType.name })
        .expect(201);
      const activity = await models.Activity.findAll({
        where: {
          UserId: user.id,
        },
      });
      expect(activity.length).toEqual(1);
      expect(activity[0].ActivityTypeId).toEqual(activityType.id);
      expect(activity[0].TagId).toEqual(tag.id);
      done();
    });
    test('Can create tag if only name present', async done => {
      const activityType = await testUtils.createActivityType(
        user.id,
        'shopping'
      );

      await testSession
        .post('/api/activity')
        .send({ tagName: 'GROCERIES', activityTypeName: activityType.name })
        .expect(201);
      const activity = await models.Activity.findAll({
        where: {
          UserId: user.id,
        },
      });
      const tag = await models.Tags.findOne({
        where: {
          name: 'groceries',
        },
      });
      expect(tag.forTable).toEqual('activity');
      expect(tag.UserId).toEqual(user.id);
      expect(activity.length).toEqual(1);
      expect(activity[0].ActivityTypeId).toEqual(activityType.id);
      expect(activity[0].TagId).toEqual(tag.id);
      done();
    });
    test('Can create activity type if only name present', async done => {
      const tag = await testUtils.createTag(user.id, 'groceries', 'activity');
      await testSession
        .post('/api/activity')
        .send({ tagName: tag.name, activityTypeName: 'SHOPPING' })
        .expect(201);
      const activity = await models.Activity.findAll({
        where: {
          UserId: user.id,
        },
      });
      const activityType = await models.ActivityTypes.findOne({
        where: {
          name: 'shopping',
        },
      });
      expect(activityType.name).toEqual('shopping');
      expect(activity.length).toEqual(1);
      expect(activity[0].ActivityTypeId).toEqual(activityType.id);
      expect(activity[0].TagId).toEqual(tag.id);
      done();
    });
    test('Will use "None" tag if none passed', async done => {
      await testSession
        .post('/api/activity')
        .send({ activityTypeName: 'abc' })
        .expect(201);
      const activity = await models.Activity.findAll({
        where: {
          UserId: user.id,
        },
      });
      const tag = await models.Tags.findOne({
        where: {
          name: 'none',
        },
      });
      expect(activity.length).toEqual(1);
      expect(activity[0].TagId).toEqual(tag.id);
      done();
    });
    test('Will throw error if activity type name missing', done => {
      testSession
        .post('/api/activity')
        .send({ tagName: 'abc' })
        .expect(400, done);
    });
    test('Can pass in a timestamp to use as the createdAt', async done => {
      const futureTime = new Date(2020, 5, 3);

      await testSession
        .post('/api/activity')
        .send({
          tagName: 'test',
          activityTypeName: 'test',
          timestamp: futureTime,
        })
        .expect(201);

      const activity = await models.Activity.findAll({
        where: {
          UserId: user.id,
        },
      });
      expect(activity.length).toEqual(1);
      expect(activity[0].createdAt).toEqual(futureTime);
      done();
    });
    test('Can persist a duration on an activity if passed', async done => {
      await testSession
        .post('/api/activity')
        .send({ tagName: 'test', activityTypeName: 'test', duration: 30 })
        .expect(201);

      const activity = await models.Activity.findAll({
        where: {
          UserId: user.id,
        },
      });
      expect(activity.length).toEqual(1);
      expect(activity[0].duration).toEqual(30);
      done();
    });
  });

  describe('GET /', () => {
    test('no session 401', done => {
      return request(app)
        .get('/api/activity')
        .expect(401, done);
    });

    test('returns all relevant data for activity page', async done => {
      const eatOutType = await testUtils.createActivityType(user.id, 'eat out');
      const choreType = await testUtils.createActivityType(user.id, 'chore');

      const noodlesTag = await testUtils.createTag(
        user.id,
        'noodles',
        'activity'
      );
      const dishwasherTag = await testUtils.createTag(
        user.id,
        'dishwasher',
        'activity'
      );

      const a1 = await testUtils.createActivity(
        user.id,
        choreType.id,
        dishwasherTag.id
      );
      const a2 = await testUtils.createActivity(
        user.id,
        eatOutType.id,
        noodlesTag.id
      );

      const res = await testSession.get('/api/activity').expect(200);

      // All should be sorted
      // Activity Types
      expect(res.body.activityTypes.length).toBe(2);
      expect(res.body.activityTypes[0].name).toEqual('chore');
      expect(res.body.activityTypes[1].name).toEqual('eat out');
      //
      // Tags
      expect(res.body.tags.length).toBe(2);
      expect(res.body.tags[0].name).toEqual('dishwasher');
      expect(res.body.tags[1].name).toEqual('noodles');

      // Activity, ordered by createdAt
      expect(res.body.activity.length).toBe(2);
      expect(res.body.activity[0].Tag.name).toEqual('noodles');
      expect(res.body.activity[0].ActivityType.name).toEqual('eat out');
      expect(res.body.activity[1].Tag.name).toEqual('dishwasher');
      expect(res.body.activity[1].ActivityType.name).toEqual('chore');

      done();
    });

    test('filters by active user', async done => {
      await testUtils.createActivityType(user.id, 'workout');
      await testUtils.createActivityType(user.id, 'eat out');
      // And a activity type for another user to test its not returned
      const otherUser = await testUtils.createUser('jim', 'b');
      await testUtils.createActivityType(otherUser.id, 'other');

      const res = await testSession.get('/api/activity').expect(200);

      expect(res.body.activityTypes.length).toBe(2);
      expect(res.body.activityTypes[0].name).toEqual('eat out');
      expect(res.body.activityTypes[1].name).toEqual('workout');
      done();
    });
  });
});
