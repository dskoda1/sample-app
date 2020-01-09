'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activities = sequelize.define(
    'Activities',
    {
      timestamp: DataTypes.DATE,
    },
    {}
  );
  Activities.associate = function(models) {
    // associations can be defined here
    Activities.belongsTo(models.Tags);
    Activities.belongsTo(models.ActivityTypes);
  };
  return Activities;
};
