const request = require('supertest');
const app = require('../app');
const models = require ('../db/models');

describe('Test app', () => {
    test('how this works', () => {
        return request(app).get('/api/passwords').then(res => {
            expect(res.statusCode).toBe(200);
        })
    })
})

describe ('Test /register', () => {
    beforeEach(() => {

    })
    async afterEach => {
        await models.User.destroy({
            truncate: true
        })
    }

    test('It creates a new user', (done) => {
        return request(app)
            .post('/api/register')
            .send({username: 'dwight', password: 'schrutesarethebest'})
            .expect(200, {username: 'dwight'}, done);
    })
})
