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
    async getSubCategories(root, args, { models, UserId }) {
      return models.FinanceSubCategories.findAll({
        where: {
          [Op.and]: [
            { FinanceCategoryId: args.categoryId},
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
    }
  },
  Mutation: {
    async createCategory(root, args, { models, UserId }) {
      // TODO: Public
      const category = await models.FinanceCategories.create({
        UserId,
        name: args.name
      });
      return {
        success: true,
        category,
      };
    }
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
    async user(root) {
      return root.getUser();
    },
  },
  FinanceSubCategory: {
    async user(root) {
      return root.getUser();
    },
    async parent(root) {
      return root.getFinanceCategory();
    }
  },
};
