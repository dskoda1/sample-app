'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Activities", "TagId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Tags",
        key: "id"
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Activities', 'TagId');
  }
};
