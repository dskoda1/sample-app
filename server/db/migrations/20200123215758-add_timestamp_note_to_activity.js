'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Activity', 'timestamp', {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn('Activity', 'note', {
        type: Sequelize.STRING,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Activity', 'timestamp'),
      queryInterface.removeColumn('Activity', 'note'),
    ]);
  },
};
