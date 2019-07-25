'use strict';
module.exports = (sequelize, DataTypes) => {
  const Disease = sequelize.define('Disease', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    signs: DataTypes.TEXT,
    symptoms: DataTypes.TEXT,
    treatment: DataTypes.TEXT
  }, {});

  Disease.associate = function(models) {
      Disease.belongsTo(models.User,{
          foreignKey:'created_by',
          as:'owner'
      });

      Disease.belongsTo(models.Category,{
          foreignKey:'category_id',
          as:'category'
      });
  };
  return Disease;
};
