const models = require('../db/models');

const truncateDatabase = async () => {
  await models.Workouts.drop();
  await models.Users.sync({ force: true });
  await models.Workouts.sync();
};

const createUser = async (username, password) => {
  const user = await models.Users.create({
    username,
    password,
  });
  return user;
};

const createWorkout = async (UserId, name) => {
  const workout = await models.Workouts.create({
    name,
    UserId,
  });
  return workout;
};

module.exports = {
  truncateDatabase,
  createUser,
  createWorkout,
};
