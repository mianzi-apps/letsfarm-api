'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING
  }, {});

  Category.associate = function(models) {
      Category.belongsTo(models.User,{
          foreignKey:'created_by',
          as:'owner'
      });

      Category.hasMany(models.Disease,{
          foreignKey:'disease_id',
          as:'diseases'
      });

      Category.hasMany(models.Practice,{
          foreignKey:'practice_id',
          as:'practices'
      });
  };
  return Category;
};
