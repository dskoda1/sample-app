const express = require('express');
const router = express.Router({ mergeParams: true });
const models = require('../db/models');
const middleware = require('./middleware');

const constants = require('./constants');

router.post(
  '/',
  middleware.fetchWorkout,
  middleware.fetchExercise,
  async (req, res) => {
    const exercise = req.exercise;
    let createArgs;
    let error = '';
    if (exercise.type === constants.CARDIO) {
      if (!req.body.duration) {
        error += 'Missing duration. ';
      }
      if (!req.body.distance) {
        error += 'Missing distance. ';
      }
      createArgs = {
        duration: req.body.duration,
        distance: req.body.distance,
      };
    } else if (exercise.type === constants.LIFT) {
      if (!req.body.reps) {
        error += 'Missing reps. ';
      }
      if (!req.body.weight && req.body.weight !== 0) {
        error += 'Missing weight. ';
      }
      createArgs = {
        reps: req.body.reps,
        weight: req.body.weight,
      };
    } else {
      return res
        .status(424)
        .json({ error: `Invalid exercise type: ${exercise.type}` });
    }
    if (error.length > 0) {
      return res.status(400).json({ error });
    }
    createArgs.ExerciseId = exercise.id;
    const set = await models.Sets.create(createArgs);
    return res.status(201).json({ id: set.id });
  }
);

router.delete(
  '/:id',
  middleware.fetchWorkout,
  middleware.fetchExercise,
  async (req, res) => {
    const set = await models.Sets.findOne({
      where: {
        id: req.params.id,
        ExerciseId: req.params.exerciseId,
      },
    });
    if (!set) {
      return res.status(404).end();
    }
    await set.destroy();
    return res.status(202).end();
  }
);

module.exports = router;
