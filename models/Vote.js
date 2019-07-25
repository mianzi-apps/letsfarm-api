'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    vote_type: DataTypes.BOOLEAN
  }, {});
  Vote.associate = function(models) {
      Vote.belongsTo(models.User,{
          foreignKey:'created_by',
          as:'owner'
      });

      Vote.belongsTo(models.Question,{
          foreignKey:'question_id',
          as:'question'
      });

  };
  return Vote;
};
