const resolvers = {
    Query: {
     async getUser (root, { username }, { models }) {
      return models.Users.findOne({
          where: {
              username
          }
      })
    },
     async getAllUsers (root, args, { models }){
      return models.Users.findAll()
    },
  },
  // Mutation: {
//     async createUser (root, { firstName, email }, { models }) {
//       return models.Student.create({
//        firstName,
//        email
//     })
//   },
//   async createHobbies (root, { studentId, title }, { models }) {
//     return models.Hobbies.create({ studentId, title })
//      }
    // },
    User: {
        async workouts(workouts) {
        return workouts.getWorkouts()
        }
    },
    Workouts: {
        async user(user) {
            return user.getUser()
        }
    },
  }
  
module.exports = resolvers;