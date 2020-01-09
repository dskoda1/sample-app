import express from 'express';
const router = express.Router({ mergeParams: true });
import models from '../db/models';

router.post('/', async (req, res) => {
  // Create an activity. Tag can be either tag name or tag it, and same with activity type.
  if (!req.session.UserId) {
    return res.status(401).end();
  }
  let tag = null;
  let activityType = null;

  const newActivity = {};
  if (req.body.tagId) {
    // TODO: Check user id of tag
    tag = await models.Tags.findOne({
      where: {
        id: req.body.tagId,
      },
    });
  } else if (req.body.tagName) {
    tag = await models.Tags.create({
      name: req.body.tagName,
      forTable: 'activities',
      UserId: req.session.UserId,
    });
  } else {
    return res
      .status(400)
      .json({ error: 'no tag param provided' })
      .end();
  }

  if (req.body.activityTypeId) {
    // TODO: Check user id of activity type
    activityType = await models.ActivityTypes.findOne({
      where: {
        id: req.body.activityTypeId,
      },
    });
  } else if (req.body.activityTypeName) {
    activityType = await models.ActivityTypes.create({
      name: req.body.activityTypeName,
      UserId: req.session.UserId,
    });
  } else {
    return res
      .status(400)
      .json({ error: 'no activity type param provided' })
      .end();
  }

  // We have a tag and activity type, now create our activity
  const activity = await models.Activities.create({
    TagId: tag.id,
    ActivityTypeId: activityType.id,
    UserId: req.session.UserId,
  });
  return res
    .status(201)
    .json({ id: activity.id })
    .end();
});

// TODO: CHange this endpoint to return all tags, activity types, and activities in a non-rest fashion
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
