const express = require('express');
const router = express.Router();

const models = require('../db/models');


// workouts/ GET - list
// const singleWorkoutMiddleware = (req, res, next) => {
//     if (req.session.userId) {
//         const workout = await models.Workouts.findOne({
//             where: {
//                 UserId: req.session.userId,
//                 id: req.params.id,
//             }
//         })
//         if (!workout) {
//             return res.status(404).end();
//         }
//         req.workout = workout;
//         next();
//     }
//     return res.status(401).end();
// };

const singleWorkoutMiddleware = (req, res, next) => {
    if (req.session.userId) {
        return models.Workouts.findOne({
            where: {
                UserId: req.session.userId,
                id: req.params.id,
            }
        }).then(workout => {
            if (!workout) {
                return res.status(404).end();
            }
            req.workout = workout;
            next();
        })
    }
    return res.status(401).end();
};

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

router.get('/:id', singleWorkoutMiddleware, (req, res) => {
    return res.json({workout: req.workout}).end();
})

router.put('/:id', singleWorkoutMiddleware, async (req, res) => {
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
})

module.exports = router;