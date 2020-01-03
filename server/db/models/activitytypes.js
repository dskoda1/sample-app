'use strict';
module.exports = (sequelize, DataTypes) => {
  const ActivityTypes = sequelize.define(
    'ActivityTypes',
    {
      name: DataTypes.STRING,
    },
    {}
  );
  ActivityTypes.associate = function(models) {
    // associations can be defined here
    ActivityTypes.hasMany(models.Activities);
  };
  return ActivityTypes;
};
