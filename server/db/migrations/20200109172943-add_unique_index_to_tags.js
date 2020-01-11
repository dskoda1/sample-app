'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('Tags', ['name', 'forTable'], {
      indexName: 'tags_name_for_table_unique_index',
      indicesType: 'UNIQUE',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex(
      'Tags',
      'tags_name_for_table_unique_index'
    );
  },
};
