const Op = require('sequelize').Op;
module.exports = {
  Query: {
    async getCategories(root, args, { models, UserId }) {
      return models.FinanceCategories.findAll({
        where: {
          [Op.or]: [
            // Active user or public
            { UserId: UserId },
            { UserId: null },
          ],
        },
        order: [['name', 'ASC']],
      });
    },
  },
  FinanceCategory: {
    async subCategories(root, args, { models, UserId }) {
      // Get sub categories for this category, and apply user permissions
      return models.FinanceSubCategories.findAll({
        where: {
          [Op.and]: [
            { FinanceCategoryId: root.id },
            {
              [Op.or]: [
                // Active user or public
                { UserId: UserId },
                { UserId: null },
              ],
            },
          ],
        },
        order: [['name', 'ASC']],
      });
    },
    async user(root, args, { models }) {
      return root.getUser();
    },
  },
  FinanceSubCategory: {
    async user(model) {
      return model.getUser();
    },
  },
};
