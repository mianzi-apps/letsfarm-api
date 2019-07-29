'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
      id: {
          type:DataTypes.UUID,
          primaryKey:true
      },
      trans_type: DataTypes.BOOLEAN,
      amount: DataTypes.INTEGER
  }, {});

  Transaction.associate = function(models) {
      Transaction.belongsTo(models.User,{
          foreignKey:'created_by',
          as:'owner'
      });

  };
  return Transaction;
};
