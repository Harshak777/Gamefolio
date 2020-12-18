'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      game.hasMany(models.contest, {
        foreignKey: 'gid',
        as: 'game_id'
      });
    }
  };
  game.init({
    gid: DataTypes.INTEGER,
    name: DataTypes.STRING,
    rules: DataTypes.STRING,
    platform: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'game',
  });
  return game;
};