import express from 'express';
const router = express.Router({ mergeParams: true });
import models from '../db/models';

router.post('/', async (req, res) => {
  if (!req.session.UserId) {
    return res.status(401).end();
  }

  if (!req.body.tagName) {
    return res
      .status(400)
      .json({ error: 'no tag param provided' })
      .end();
  }
  const [tag, _] = await models.Tags.findOrCreate({
    where: {
      name: req.body.tagName,
      forTable: 'activity',
      UserId: req.session.UserId,
    },
  });

  if (!req.body.activityTypeName) {
    return res
      .status(400)
      .json({ error: 'no activity type param provided' })
      .end();
  }
  const [activityType, __] = await models.ActivityTypes.findOrCreate({
    where: {
      name: req.body.activityTypeName,
      UserId: req.session.UserId,
    },
  });

  // We have a tag and activity type, now create our activity
  const activity = await models.Activity.create({
    TagId: tag.id,
    ActivityTypeId: activityType.id,
    UserId: req.session.UserId,
  });
  return res
    .status(201)
    .json({ id: activity.id })
    .end();
});

// TODO: CHange this endpoint to return all tags, activity types, and activity in a non-rest fashion
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
