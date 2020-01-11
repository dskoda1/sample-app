'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {}
  );
  Users.associate = function(models) {
    // associations can be defined here
    Users.hasMany(models.Workouts);
    Users.hasMany(models.FinanceCategories);
    Users.hasMany(models.FinanceSubCategories);
    Users.hasMany(models.ActivityTypes);
    Users.hasMany(models.Activity);
    Users.hasMany(models.Tags);
  };
  return Users;
};
