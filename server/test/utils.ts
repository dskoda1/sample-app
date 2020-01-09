import models from '../db/models';
import constants from '../routes/constants';

const truncateFitnessTables = async () => {
  const destroyArgs = {
    where: {},
  };
  await models.Sets.destroy(destroyArgs);
  await models.Exercises.destroy(destroyArgs);
  await models.Workouts.destroy(destroyArgs);
  await models.Users.destroy(destroyArgs);
};

const truncateFinanceTables = async (): Promise<void> => {
  const destroyArgs = {
    where: {},
  };
  await models.FinanceSubCategories.destroy(destroyArgs);
  await models.FinanceCategories.destroy(destroyArgs);
  await models.Users.destroy(destroyArgs);
};

const truncateActivityTables = async (): Promise<void> => {
  const destroyArgs = {
    where: {},
  };
  await models.Activities.destroy(destroyArgs);
  await models.ActivityTypes.destroy(destroyArgs);
  await models.Tags.destroy(destroyArgs);
  await models.Users.destroy(destroyArgs);
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

const createLiftExercise = async (WorkoutId, name) => {
  return await createExercise(WorkoutId, name, constants.LIFT);
};
const createCardioExercise = async (WorkoutId, name) => {
  return await createExercise(WorkoutId, name, constants.CARDIO);
};

const createCardioSet = async (ExerciseId, duration, distance) => {
  return await models.Sets.create({
    ExerciseId,
    duration,
    distance,
  });
};

const createLiftSet = async (ExerciseId, weight, reps) => {
  return await models.Sets.create({
    ExerciseId,
    weight,
    reps,
  });
};

const createFinanceCategory = async (UserId, name) => {
  return await models.FinanceCategories.create({
    name,
    UserId,
  });
};

const createFinanceSubCategory = async (FinanceCategoryId, UserId, name) =>
  await models.FinanceSubCategories.create({
    FinanceCategoryId,
    UserId,
    name,
  });

const createActivityType = async (UserId: number, name: string) =>
  await models.ActivityTypes.create({
    name,
    UserId,
  });

const createTag = async (UserId: number, name: string, forTable: string) =>
  await models.Tags.create({
    name,
    UserId,
    forTable,
  });

const createActivity = async (
  UserId: number,
  ActivityTypeId: number,
  TagId: number
) =>
  await models.Activities.create({
    UserId,
    ActivityTypeId,
    TagId,
  });

export default {
  // Table maintenance functions
  truncateFitnessTables,
  truncateFinanceTables,
  truncateActivityTables,
  // General
  createUser,
  createTag,
  // Fitness helpers
  createWorkout,
  createExercise,
  createCardioExercise,
  createLiftExercise,
  createCardioSet,
  createLiftSet,
  // Finance helpers
  createFinanceCategory,
  createFinanceSubCategory,
  // Activity helpers
  createActivityType,
  createActivity,
};
