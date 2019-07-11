const { merge } = require('lodash');

const userResolver = require('./user');
const workoutsResolver = require('./workouts');
const financeResolver = require('./finance');

const resolvers = merge({}, workoutsResolver, userResolver, financeResolver);

module.exports = resolvers;
