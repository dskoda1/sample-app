import express from 'express';
const router = express.Router({ mergeParams: true });
import models from '../db/models';

router.get('/', async (req, res) => {
  if (!req.session.UserId) {
    return res.status(401).end();
  }

  const activityTypes = await models.ActivityTypes.findAll({
    where: {
      UserId: req.session.UserId,
    },
    order: [['name', 'ASC']],
  });

  return res
    .status(200)
    .json({ activityTypes })
    .end();
});

export default router;
