const Op = require('sequelize').Op;

module.exports = {
  development: {
    username: 'improveme_user',
    password: 'improveme_user_password',
    database: 'improveme_dev',
    host: '0.0.0.0',
    dialect: 'postgres',
    migrationStorage: 'sequelize',
    logging: console.log,
  },
  local_test: {
    username: 'improveme_user',
    password: 'improveme_user_password',
    database: 'improveme_test',
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
