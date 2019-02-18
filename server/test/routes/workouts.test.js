const request = require('supertest');
const session = require('supertest-session');
const app = require('../../app');
const models = require ('../../db/models');

const testUtils = require('../utils');

describe ('Test workout endpoints', () => {
    let testSession = null;
    let user = null;
    beforeEach(async (done) => {
        await testUtils.truncateDatabase();
        testSession = session(app);
        await testSession.post('/api/register')
            .send({username: 'dwight', password: 'ilovebeets'})
            .expect(200, {username: 'dwight'})
        user = await models.Users.findOne({where: {username: 'dwight'}})
        done()
    })

    describe('POST /', () => {
        test('POST / with no session 401', (done) => {
            return request(app)
                .post('/api/workouts')
                .expect(401, done);
        })
        test('POST / 201', async (done) => {
            await testSession
                .post('/api/workouts')
                .send({name: 'full body'})
                .expect(201, {name: 'full body', id: 1});
            await user.reload();
            const workouts = await user.getWorkouts();
            expect(workouts.length).toBe(1);
            done();
        })
    })
    
    test('GET / with no session 401', (done) => {
        return request(app)
            .get('/api/workouts')
            .expect(401, done);
    })
    test('GET / 202', async (done) => {
        // Create some workouts for our test user
        await testUtils.createWorkout(user.id, 'back and bis');
        await testUtils.createWorkout(user.id, 'cardio');
        await testUtils.createWorkout(user.id, 'legs');

        // And a workout for another user to test its not returned
        const otherUser = await testUtils.createUser('jim', 'b')
        await testUtils.createWorkout(otherUser.id, 'legs');

        const res = await testSession
            .get('/api/workouts')
            .expect(200);
        expect(res.body.workouts.length).toBe(3)
        done();
    })
    test('GET /:id 200', async(done) => {
        const workout = await testUtils.createWorkout(user.id, 'chest');

        const res = await testSession
            .get(`/api/workouts/${workout.id}`)
            .expect(200);
        expect(res.body.workout.id).toBe(workout.id);
        expect(res.body.workout.name).toBe(workout.name);
        done();
    })
    test('GET /:id not owner 404', async (done) => {
        const otherUser = await testUtils.createUser('jim', 'b')
        const workout = await testUtils.createWorkout(otherUser.id, 'legs');

        await testSession
            .get(`/api/workouts/${workout.id}`)
            .expect(404);
        done();
    })
    test('GET /:id not found 404', (done) => {
        return testSession
            .get('/api/workouts/23')
            .expect(404, done);
    })
    test('GET /:id with no session 401', (done) => {
        return request(app)
            .get('/api/workouts/23')
            .expect(401, done);
    })
})
