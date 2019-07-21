export default {
  Query: {
    async getWorkouts(root, args, { models, UserId }) {
      return models.Workouts.findAll({
        where: {
          UserId: UserId,
        },
        order: [['createdAt', 'DESC']],
      });
    },
  },
  Workouts: {
    async user(workout, args, { models }) {
      return models.Users.findOne({
        where: {
          id: workout.UserId,
        },
      });
    },
  },
};
