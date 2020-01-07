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

    test('Can use tag / activity type id of already created entities', async done => {
      const activityType = await testUtils.createActivityType(user.id, 'shopping');
      const tag = await testUtils.createTag(user.id, 'groceries', 'activity');

      await testSession
        .post('/api/activity')
        .send({ tagId: tag.id, activityTypeId: activityType.id })
        .expect(202);
      const activity = await models.Activities.findAll({
        where: {
          UserId: user.id
        }
      });
      expect(activity.length).toEqual(1);
      expect(activity[0].ActivityTypeId).toEqual(activityType.id);
      expect(activity[0].TagId).toEqual(tag.id);
      done();
    });
    test('Can create tag if only name present', async done => {
      const activityType = await testUtils.createActivityType(user.id, 'shopping');

      await testSession
        .post('/api/activity')
        .send({ tagName: 'groceries', activityTypeId: activityType.id })
        .expect(202);
      const activity = await models.Activities.findAll({
        where: {
          UserId: user.id
        }
      });
      const tag = await models.Tags.findOne({
        where: {
          name: 'groceries'
        }
      });
      expect(tag.forTable).toEqual('activities');
      expect(tag.UserId).toEqual(user.id);
      expect(activity.lenwgth).toEqual(1);
      expect(activity[0].ActivityTypeId).toEqual(activityType.id);
      expect(activity[0].TagId).toEqual(tag.id);
      done();
    });
    test.todo('Can create activity type if only name present');
    test.todo('Will throw error if neither tag nor tag name present');
    test.todo('Will throw error if neither activity type nor type name present');
  });

  describe('GET /', () => {
    test('no session 401', done => {
      return request(app)
        .get('/api/activity')
        .expect(401, done);
    });

    test('returns list of activity types sorted by name', async done => {
      await testUtils.createActivityType(user.id, 'workout');
      await testUtils.createActivityType(user.id, 'eat out');

      const res = await testSession.get('/api/activity').expect(200);

      expect(res.body.activityTypes.length).toBe(2);
      expect(res.body.activityTypes[0].name).toEqual('eat out');
      expect(res.body.activityTypes[1].name).toEqual('workout');
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
