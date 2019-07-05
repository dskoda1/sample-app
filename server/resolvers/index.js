const { merge } = require('lodash');

const userResolver = require('./user');
const workoutsResolver = require('./workouts');

const resolvers = merge({}, workoutsResolver, userResolver);

module.exports = resolvers;
