'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    id: DataTypes.UUID,
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {});
  Question.associate = function(models) {
      Question.belongsTo(models.User,{
          foreignKey:'created_by',
          as:'owner'
      });

      Question.hasMany(models.Answer,{
          foreignKey:'question_id',
          as:'answers'
      });

      Question.hasMany(models.Vote,{
          foreignKey:'question_id',
          as:'votes'
      });
  };
  return Question;
};
