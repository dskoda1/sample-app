'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define(
    'Activity',
    {
      timestamp: DataTypes.DATE,
    },
    {
      freezeTableName: true,
    }
  );
  Activity.associate = function(models) {
    // associations can be defined here
    Activity.belongsTo(models.Tags);
    Activity.belongsTo(models.ActivityTypes);
  };
  return Activity;
};
