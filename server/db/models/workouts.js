'use strict';
module.exports = (sequelize, DataTypes) => {
  const Workouts = sequelize.define(
    'Workouts',
    {
      name: DataTypes.STRING,
      finishedAt: DataTypes.DATE,
    },
    {}
  );
  Workouts.associate = function(models) {
    // associations can be defined here
    Workouts.hasMany(models.Exercises, { as: 'exercises' });
  };
  return Workouts;
};
