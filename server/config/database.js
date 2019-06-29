const Op = require('sequelize').Op;

module.exports = {
  development: {
    username: 'dskoda',
    password: 'toolzroolz',
    database: 'dskoda',
    host: '0.0.0.0',
    dialect: 'postgres',
    migrationStorage: 'sequelize',
    logging: console.log,
  },
  local_test: {
    username: 'dskoda',
    password: 'toolzroolz',
    database: 'workouts-local-test',
    host: '0.0.0.0',
    dialect: 'postgres',
    migrationStorage: 'sequelize',
    logging: false,
  },
  test: {
    username: 'postgres',
    password: '',
    database: 'travis_ci_test',
    dialect: 'postgres',
    logging: false,
  },
  staging: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: console.log,
    migrationStorage: 'sequelize',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false,
    migrationStorage: 'sequelize',
  },
};
