import { Op }  from 'sequelize';
export default {
  Query: {
    async getCategories(root, args, context: ResolverContext) {
      return context.models.FinanceCategories.findAll({
        where: {
          [Op.or]: [
            // Active user or public
            { UserId: context.UserId },
            { UserId: null },
          ],
        },
        order: [['name', 'ASC']],
      });
    },
    async getSubCategories(root, args, context: ResolverContext) {
      return context.models.FinanceSubCategories.findAll({
        where: {
          [Op.and]: [
            { FinanceCategoryId: args.categoryId},
            {
              [Op.or]: [
                // Active user or public
                { UserId: context.UserId },
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
    async createCategory(root, args, context: ResolverContext) {
      // TODO: Public
      try {
        const category = await context.models.FinanceCategories.create({
          UserId: context.UserId,
          name: args.name
        });
        return {
          success: true,
          category
        };
      }catch (err) {
        return {
          success: false,
          message: err.parent.detail,
        }
      }
    }
  },
  FinanceCategory: {
    async subCategories(root, args, context: ResolverContext) {
      // Get sub categories for this category, and apply user permissions
      return context.models.FinanceSubCategories.findAll({
        where: {
          [Op.and]: [
            { FinanceCategoryId: root.id },
            {
              [Op.or]: [
                // Active user or public
                { UserId: context.UserId },
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
