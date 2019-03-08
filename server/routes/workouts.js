const express = require('express');
const router = express.Router();

const models = require('../db/models');
const middleware = require('./middleware');

router.get('/', async (req, res) => {
  if (req.session.UserId) {
    const workouts = await models.Workouts.findAll({
      where: {
        UserId: req.session.UserId,
      },
      order: [['createdAt', 'DESC']],
    });
    return res
      .status(200)
      .json({ workouts })
      .end();
  }
  res.status(401).end();
});
router.post('/', async (req, res) => {
  console.log('Creating workout');
  if (req.session.UserId) {
    if (!req.body.name || req.body.name.length < 3) {
      return res
        .status(400)
        .json({ error: 'Name must be at least 3 characters' })
        .end();
    }

    const workout = await models.Workouts.create({
      name: req.body.name,
      UserId: req.session.UserId,
    });
    console.log('workout created');
    return res
      .status(201)
      .json({ name: workout.name, id: workout.id })
      .end();
  }
  return res.status(401).end();
});

router.get('/:workoutId', middleware.fetchWorkout, (req, res) => {
  let workout = req.workout;
  return res.json({ workout }).end();
});

router.put('/:workoutId', middleware.fetchWorkout, async (req, res) => {
  const workout = req.workout;
  if (req.body.finished !== undefined) {
    workout.finishedAt = Date.now();
    await workout.save();
    return res.status(202).end();
  }
  if (req.body.name != undefined) {
    workout.name = req.body.name;
    await workout.save();
    return res.status(202).end();
  }
  return res.status(200).end();
});

module.exports = router;
