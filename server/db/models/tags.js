'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define(
    'Tags',
    {
      name: DataTypes.STRING,
      forTable: DataTypes.STRING,
    },
    {}
  );
  Tags.associate = function(models) {
    // associations can be defined here
    Tags.hasMany(models.Activity);
  };
  return Tags;
};
