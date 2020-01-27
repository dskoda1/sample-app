import models from '../db/models';

const perform_update = async () => {
  const activity = await models.Activity.findAll();
  console.log(activity.length);
  const without_timestamp = activity.filter(activity => !activity.timestamp);
  console.log(without_timestamp.length);
  for (let activity of without_timestamp) {
    activity.timestamp = activity.createdAt;
    await activity.save();
    console.log(`updated activity ${activity.id}`);
  }
};

const result = perform_update();
result.then(() => {
  console.log('finished');
});
