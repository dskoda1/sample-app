const request = require('supertest');
const app = require('../app');
const models = require ('../db/models');
const testUtils = require('./utils');

describe ('Test user endpoints', () => {
    beforeEach(async (done) => {
        await testUtils.truncateDatabase();
        done()
    })
    test('/register creates a new user', (done) => {
        return request(app)
            .post('/api/register')
            .send({username: 'dwight', password: 'schrutesarethebest'})
            .expect(200, {username: 'dwight'})
            .end(async (err, res) => {
                if (err) {
                    return done(err);
                }
                // Get the user from db
                const user = await models.Users.findOne({where: {username: 'dwight'}})
                expect(user.username).toBe('dwight')  
                return done()
        });
    });
});
