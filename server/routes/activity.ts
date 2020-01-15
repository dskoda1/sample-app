import express from 'express';
const router = express.Router({ mergeParams: true });
import models from '../db/models';

router.post('/', async (req, res) => {
  if (!req.session.UserId) {
    return res.status(401).end();
  }
  let tagName = 'none';
  if (req.body.tagName) {
    tagName = req.body.tagName.toLowerCase();
  }
  const [tag, _] = await models.Tags.findOrCreate({
    where: {
      name: tagName,
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
      name: req.body.activityTypeName.toLowerCase(),
      UserId: req.session.UserId,
    },
  });

  // We have a tag and activity type, now create our activity
  const activity = await models.Activity.create({
    TagId: tag.id,
    ActivityTypeId: activityType.id,
    UserId: req.session.UserId,
    createdAt: req.body.timestamp,
    duration: req.body.duration,
  });
  return res
    .status(201)
    .json({ id: activity.id })
    .end();
});

router.get('/', async (req, res) => {
  if (!req.session.UserId) {
    return res.status(401).end();
  }
  // TODO: Perform the three queries all at the same time using Promise.all to speed things up
  const activityTypes = await models.ActivityTypes.findAll({
    where: {
      UserId: req.session.UserId,
    },
    order: [['name', 'ASC']],
  });
  const tags = await models.Tags.findAll({
    where: {
      UserId: req.session.UserId,
    },
    order: [['name', 'ASC']],
  });
  const activity = await models.Activity.findAll({
    where: {
      UserId: req.session.UserId,
    },
    order: [['createdAt', 'DESC']],
    include: [models.Tags, models.ActivityTypes],
  });

  return res
    .status(200)
    .json({ activityTypes, tags, activity })
    .end();
});

export default router;
