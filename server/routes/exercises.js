const express = require('express');
const router = express.Router({ mergeParams: true });
const models = require('../db/models');
const middleware = require('./middleware');

router.post('/', middleware.fetchWorkout, async (req, res) => {
  // Make sure the request type is valid
  const type = (req.body.type || '').toLowerCase();
  if (type !== 'lift' && type !== 'cardio') {
    return res
      .status(400)
      .json({ error: `invalid type ${type}; must be cardio or lift.` });
  }
  const name = (req.body.name || '').toLowerCase();
  if (name.length < 3) {
    return res
      .status(400)
      .json({ error: `name must be at least 3 characters long: ${name}` });
  }

  const exercise = await models.Exercises.create({
    name,
    type,
    WorkoutId: req.workout.id,
  });

  return res.status(201).json({ name: exercise.name, id: exercise.id });
});

router.get('/', middleware.fetchWorkout, async (req, res) => {
  const exercises = await models.Exercises.findAll({
    where: {
      WorkoutId: req.workout.id,
    },
    order: [['createdAt', 'DESC']],
  });
  return res
    .status(200)
    .json({ exercises })
    .end();
});

router.get(
  '/:exerciseId',
  middleware.fetchWorkout,
  middleware.fetchExercise,
  (req, res) => {
    let exercise = req.exercise;
    return res.json({ exercise }).end();
  }
);

router.delete(
  '/:exerciseId',
  middleware.fetchWorkout,
  middleware.fetchExercise,
  async (req, res) => {
    let exercise = req.exercise;
    await exercise.destroy();
    return res.status(202).end();
  }
);

router.put(
  '/:exerciseId',
  middleware.fetchWorkout,
  middleware.fetchExercise,
  async (req, res) => {
    let exercise = req.exercise;
    let newName = (req.body.name || '').toLowerCase();

    if (newName.length < 3) {
      return res
        .status(400)
        .json({ error: `name must be at least 3 characters long: ${newName}` })
        .end();
    }

    exercise.name = newName;
    await exercise.save();
    return res.status(202).end();
  }
);

router.post(
  '/:exerciseId/sets',
  middleware.fetchWorkout,
  middleware.fetchExercise,
  async (req, res) => {
    return res.status(407).end();
  }
);

module.exports = router;
