const express = require('express');
const router = express.Router();

const models = require('../db/models');


// workouts/ GET - list
router.get('/', async (req, res) => {
    if (req.session.userId) {
        const workouts = await models.Workouts.findAll({
            where: {
                UserId: req.session.userId
            }
        });
        return res.status(200).json({workouts}).end();
    }
    res.status(401).end();
})
router.post('/', async (req, res) => {
    if (req.session.userId) {
        const workout = await models.Workouts.create({
            name: req.body.name,
            UserId: req.session.userId,
        })
        return res
            .status(201)
            .json({name: workout.name, id: workout.id})
            .end();
    }
    return res.status(401).end();
})

router.get('/:id', async (req, res) => {
    if (req.session.userId) {
        const workout = await models.Workouts.findOne({
            where: {
                UserId: req.session.userId,
                id: req.params.id,
            }
        })
        if (!workout) {
            return res.status(404).end();
        }
        return res.json({workout}).end();
    }
    return res.status(401).end();
})

module.exports = router;