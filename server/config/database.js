const Op = require('sequelize').Op;

module.exports = {
  development: {
    username: 'dskoda',
    password: 'toolzroolz',
    database: 'dskoda',
    host: '0.0.0.0',
    dialect: 'postgres',
    migrationStorage: 'sequelize',
    logging: false,
    operatorsAliases: {
      $and: Op.and,
      $or: Op.or,
      $eq: Op.eq,
      $gt: Op.gt,
      $lt: Op.lt,
      $lte: Op.lte,
      $like: Op.like
    }
  },
  local_test: {
    username: 'dskoda',
    password: 'toolzroolz',
    database: 'workouts-local-test',
    host: '0.0.0.0',
    dialect: 'postgres',
    migrationStorage: 'sequelize',
    logging: false,
    operatorsAliases: {
      $and: Op.and,
      $or: Op.or,
      $eq: Op.eq,
      $gt: Op.gt,
      $lt: Op.lt,
      $lte: Op.lte,
      $like: Op.like
    }
  },
  test: {
    username: 'postgres',
    password: '',
    database: 'travis_ci_test',
    dialect: 'postgres',
    logging: false,
    operatorsAliases: {
      $and: Op.and,
      $or: Op.or,
      $eq: Op.eq,
      $gt: Op.gt,
      $lt: Op.lt,
      $lte: Op.lte,
      $like: Op.like
    }
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    dialect: 'mysql'
  },
};