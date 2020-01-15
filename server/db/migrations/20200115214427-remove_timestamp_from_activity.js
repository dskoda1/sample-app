'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Activity', 'timestamp');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Activity', 'timestamp', {
      type: Sequelize.DATE,
    });
  },
};
