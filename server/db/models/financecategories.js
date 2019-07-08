'use strict';
module.exports = (sequelize, DataTypes) => {
  const FinanceCategories = sequelize.define('FinanceCategories', {
    name: DataTypes.STRING
  }, {});
  FinanceCategories.associate = function(models) {
    // associations can be defined here
    FinanceCategories.hasMany(models.FinanceSubCategories);
    FinanceCategories.belongsTo(models.Users);
  };
  return FinanceCategories;
};