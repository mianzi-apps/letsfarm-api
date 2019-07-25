'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    body: DataTypes.TEXT
  }, {});
  Answer.associate = function(models) {
    Answer.belongsTo(models.Question,{
      foreignKey:'question_id',
      as:'question'
    });
    Answer.belongsTo(models.User,{
          foreignKey:'created_by',
          as:'owner'
    });
  };
  return Answer;
};
