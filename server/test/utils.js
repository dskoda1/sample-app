const models = require('../db/models');

const truncateDatabase = async () => {
  await models.Sets.drop();
  await models.Exercises.drop();
  await models.Workouts.drop();
  await models.Users.sync({ force: true });
  await models.Workouts.sync({ force: true });
  await models.Exercises.sync({ force: true });
  await models.Sets.sync({sync: true});
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

const createCardioSet = async (ExerciseId, duration, distance) => {
  const set = await models.Sets.create({
    ExerciseId,
    duration,
    distance,
  });
  return set;
};

const createLiftSet = async (ExerciseId, weight, reps) => {
  const set = await models.Sets.create({
    ExerciseId,
    weight,
    reps,
  });
  return set;
};

module.exports = {
  truncateDatabase,
  createUser,
  createWorkout,
  createExercise,
  createCardioSet,
  createLiftSet
};
