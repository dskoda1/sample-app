const models = require('../db/models');

const truncateDatabase = async () => {
  await models.Exercises.drop();
  await models.Workouts.drop();
  await models.Users.sync({ force: true });
  await models.Workouts.sync();
  await models.Exercises.sync();
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

const createExercise = async (WorkoutId, name, type) => {
  const exercise = await models.Exercises.create({
    WorkoutId,
    name,
    type,
  });
  return exercise;
};

module.exports = {
  truncateDatabase,
  createUser,
  createWorkout,
  createExercise,
};
