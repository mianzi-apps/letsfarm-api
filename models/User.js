'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
        type:DataTypes.UUID,
        primaryKey:true
    },
    display_name: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    auth_token: DataTypes.STRING,
    log_type: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
      defaultScope: {
          attributes: { exclude: ['password'] },
      }
  });

  User.associate = function(models) {
      User.hasMany(models.Question,{
          foreignKey:'created_by',
          as:'questions'
      });

      User.hasMany(models.Answer,{
          foreignKey:'created_by',
          as:'answers'
      });

      User.hasMany(models.Project,{
          foreignKey:'created_by',
          as:'projects'
      });

      User.hasMany(models.Transaction,{
          foreignKey:'created_by',
          as:'transactions'
      });

  };
  return User;
};
