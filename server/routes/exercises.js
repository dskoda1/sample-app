const express = require('express');
const router = express.Router({ mergeParams: true });
const models = require('../db/models');

router.post('/', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).end();
  }
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
        .json({error: `name must be at least 3 characters long: ${name}`})
  }

  // TODO: Validate that workout is owned by user
  const exercise = await models.Exercises.create({
      name,
      type,
      WorkoutId: req.params.workoutId,
  })

  return res.status(201).json({name: exercise.name, id: exercise.id});
});

module.exports = router;
