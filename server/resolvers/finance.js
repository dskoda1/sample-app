const Op = require('sequelize').Op
module.exports = {
  Query: {
    async getCategories(root, args, { models, UserId }) {
        return models.FinanceCategories.findAll({
          where: {
            [Op.or]: [
              {
                UserId: UserId
              },
              {
                UserId: null
              }
            ],
          },
          order: [['name', 'ASC']]
        });
    }
  },
  FinanceCategory: {
    async subCategories(model) {
      return model.getFinanceSubCategories();
    },
    async user(root, args, { models }) {
      return root.getUser();
    }
  },
  FinanceSubCategory: {
    async user(model) {
      return model.getUser();
    }
  }
};