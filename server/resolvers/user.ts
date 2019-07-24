export default {
  Query: {
    async getUser(root, args, { models, UserId }) {
      console.log(args);
      console.log(UserId);
      return models.Users.findByPk(UserId);
    },
  },
  User: {
    async workouts(user) {
      return user.getWorkouts();
    },
  },
};
