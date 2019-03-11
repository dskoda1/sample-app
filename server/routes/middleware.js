const models = require('../db/models');

const fetchWorkout = async (req, res, next) => {
  if (!req.session.UserId) {
    return res.status(401).end();
  }

  const workout = await models.Workouts.findOne({
    where: {
      UserId: req.session.UserId,
      id: req.params.workoutId,
    },
    include: {
      model: models.Exercises,
      as: 'exercises',
      include: { model: models.Sets, as: 'sets' },
    },
    order: [
      [{ model: models.Exercises, as: 'exercises' }, 'createdAt', 'DESC'],
    ],
  });
  if (!workout) {
    return res.status(404).end();
  }
  req.workout = workout;
  next();
};

const fetchExercise = async (req, res, next) => {
  if (!req.session.UserId) {
    return res.status(401).end();
  }
  if (!req.workout) {
    console.log(
      'Should never get to exercise middleware without workout already found'
    );
    process.exit(1);
  }
  const exercise = await models.Exercises.findOne({
    where: {
      id: req.params.exerciseId,
      WorkoutId: req.workout.id,
    },
  });

  if (!exercise) {
    return res.status(404).end();
  }

  req.exercise = exercise;
  next();
};

module.exports = {
  fetchWorkout,
  fetchExercise,
};
