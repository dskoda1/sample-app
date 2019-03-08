'use strict';
// Created with the following command:
// ./node_modules/.bin/sequelize model:generate --name Exercises --attributes name:string,type:string
module.exports = (sequelize, DataTypes) => {
  const Exercises = sequelize.define(
    'Exercises',
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {}
  );
  Exercises.associate = function(models) {
    // associations can be defined here
    Exercises.hasMany(models.Sets, { as: 'sets' });

  };
  return Exercises;
};
