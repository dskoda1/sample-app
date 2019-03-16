const Op = require('sequelize').Op;

const aliases = {
  $and: Op.and,
  $or: Op.or,
  $eq: Op.eq,
  $gt: Op.gt,
  $lt: Op.lt,
  $lte: Op.lte,
  $like: Op.like,
};

module.exports = {
  development: {
    username: 'dskoda',
    password: 'toolzroolz',
    database: 'dskoda',
    host: '0.0.0.0',
    dialect: 'postgres',
    migrationStorage: 'sequelize',
    logging: console.log,
    operatorsAliases: aliases
  },
  local_test: {
    username: 'dskoda',
    password: 'toolzroolz',
    database: 'workouts-local-test',
    host: '0.0.0.0',
    dialect: 'postgres',
    migrationStorage: 'sequelize',
    logging: false,
    operatorsAliases: aliases
  },
  test: {
    username: 'postgres',
    password: '',
    database: 'travis_ci_test',
    dialect: 'postgres',
    logging: false,
    operatorsAliases: aliases
  },
  staging: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: console.log,
    migrationStorage: 'sequelize',
    operatorsAliases: aliases
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false,
    migrationStorage: 'sequelize',
    operatorsAliases: aliases
  },
};
