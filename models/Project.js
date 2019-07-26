'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
      id: {
          type:DataTypes.UUID,
          primaryKey:true
      },
      title: DataTypes.STRING,
      image_url: DataTypes.STRING,
      is_public: DataTypes.BOOLEAN
  }, {});

  Project.associate = function(models) {
      Project.belongsTo(models.User,{
          foreignKey:'created_by',
          as:'owner'
      });

  };
  return Project;
};
