'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class winner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      winner.belongsTo(models.team, {
        foreignKey: 'tid',
        as: 'teamW_id'
      });

      winner.belongsTo(models.contest, {
        foreignKey: 'cid',
        as: 'cont_id'
      });
    }
  };
  winner.init({
    wid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tid: DataTypes.INTEGER,
    cid: DataTypes.INTEGER,
    position: DataTypes.STRING,
    prize:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'winner',
  });
  return winner;
};