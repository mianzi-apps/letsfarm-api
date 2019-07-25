'use strict';
module.exports = (sequelize, DataTypes) => {
  const Practice = sequelize.define('Practice', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    step_level: DataTypes.INTEGER
  }, {});
  Practice.associate = function(models) {
      Practice.belongsTo(models.User,{
          foreignKey:'created_by',
          as:'owner'
      });

      Practice.belongsTo(models.Category,{
          foreignKey:'category_id',
          as:'category'
      });
  };
  return Practice;
};
