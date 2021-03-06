'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING
  }, {});

  Category.associate = function(models) {
      // Category.belongsTo(models.User,{
      //     foreignKey:'created_by',
      //     as:'owner'
      // });

      Category.hasMany(models.Disease,{
          foreignKey:'category_id',
          as:'diseases'
      });

      Category.hasMany(models.Practice,{
          foreignKey:'category_id',
          as:'practices'
      });
  };
  return Category;
};
