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
  let duration = 0;
  if (req.body.duration) {
    duration = req.body.duration;
  }
  let timestamp = Date.now();
  if (req.body.timestamp) {
    timestamp = req.body.timestamp;
  }

  // We have a tag and activity type, now create our activity
  const activity = await models.Activity.create({
    TagId: tag.id,
    ActivityTypeId: activityType.id,
    UserId: req.session.UserId,
    createdAt: timestamp,
    timestamp,
    duration,
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
    order: [['timestamp', 'DESC']],
    include: [models.Tags, models.ActivityTypes],
  });

  return res
    .status(200)
    .json({ activityTypes, tags, activity })
    .end();
});

router.delete('/:activityId', async (req, res) => {
  if (!req.session.UserId) {
    return res.status(401).end();
  }

  const activity = await models.Activity.findOne({
    where: {
      id: req.params.activityId,
      UserId: req.session.UserId,
    },
  });
  if (!activity) {
    return res.status(404).end();
  }

  await activity.destroy();

  return res.status(202).end();
});

router.put('/:activityId', async (req, res) => {
  if (!req.session.UserId) {
    return res.status(401).end();
  }
  const activity = await models.Activity.findOne({
    where: {
      id: req.params.activityId,
      UserId: req.session.UserId,
    },
    include: [models.Tags, models.ActivityTypes],
  });
  if (!activity) {
    return res.status(404).end();
  }

  // We've found the activity in question, attempt to update its params
  if (
    req.body.activityTypeName &&
    req.body.activityTypeName.toLowerCase() != activity.ActivityType.name
  ) {
    const [activityType, __] = await models.ActivityTypes.findOrCreate({
      where: {
        name: req.body.activityTypeName.toLowerCase(),
        UserId: req.session.UserId,
      },
    });
    activity.ActivityTypeId = activityType.id;
  }
  let tagName = 'none';
  if (req.body.tagName) {
    tagName = req.body.tagName.toLowerCase();
  }
  if (tagName != activity.Tag.name) {
    const [tag, _] = await models.Tags.findOrCreate({
      where: {
        name: tagName,
        forTable: 'activity',
        UserId: req.session.UserId,
      },
    });
    activity.TagId = tag.id;
  }

  if (req.body.duration != activity.duration) {
    activity.duration = req.body.duration;
  }

  if (req.body.timestamp != activity.timestamp) {
    activity.timestamp = req.body.timestamp;
  }

  await activity.save();

  return res.status(202).end();
});

export default router;
