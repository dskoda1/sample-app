'use strict';
// Created with
// ./node_modules/.bin/sequelize model:generate --name Sets --attributes duration:integer,distance:decimal,weight:integer,reps:integer
module.exports = (sequelize, DataTypes) => {
  const Sets = sequelize.define('Sets', {
    duration: DataTypes.INTEGER,
    distance: DataTypes.DECIMAL,
    weight: DataTypes.INTEGER,
    reps: DataTypes.INTEGER
  }, {});
  Sets.associate = function(models) {
    // associations can be defined here
  };
  return Sets;
};