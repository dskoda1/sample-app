import request from 'supertest';
import session from 'supertest-session';
import { app } from '../../app';
import models from '../../db/models';
import testUtils from '../utils';


describe('Test activity types endpoints', () => {
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

  describe('GET /', () => {
    test('no session 401', done => {
      return request(app)
        .get('/api/activity_types')
        .expect(401, done);
    });

    test('returns list of activity types sorted by name', async done => {
      await testUtils.createActivityType(user.id, 'workout');
      await testUtils.createActivityType(user.id, 'eat out');

      const res = await testSession.get('/api/activity_types').expect(200);

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

      const res = await testSession.get('/api/activity_types').expect(200);

      expect(res.body.activityTypes.length).toBe(2);
      expect(res.body.activityTypes[0].name).toEqual('eat out');
      expect(res.body.activityTypes[1].name).toEqual('workout');
      done();
    });
  });
});
