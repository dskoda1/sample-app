'use strict';
module.exports = (sequelize, DataTypes) => {
  const FinanceSubCategories = sequelize.define('FinanceSubCategories', {
    name: DataTypes.STRING
  }, {});
  FinanceSubCategories.associate = function(models) {
    // associations can be defined here
    FinanceSubCategories.hasOne(models.Users);
    FinanceSubCategories.hasOne(models.FinanceCategories);
  };
  return FinanceSubCategories;
};