'use strict';
module.exports = (sequelize, DataTypes) => {
  const FinanceSubCategories = sequelize.define('FinanceSubCategories', {
    name: DataTypes.STRING
  }, {});
  FinanceSubCategories.associate = function(models) {
    // associations can be defined here
    FinanceSubCategories.belongsTo(models.Users);
    FinanceSubCategories.belongsTo(models.FinanceCategories);
  };
  return FinanceSubCategories;
};