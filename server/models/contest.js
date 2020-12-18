'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      contest.belongsTo(models.game, {
        foreignKey: 'gid',
        as: 'game_id'
      });

      contest.hasMany(models.participant, {
        foreignKey: 'cid',
        as: 'contest_id'
      });

      contest.hasMany(models.winner, {
        foreignKey: 'cid',
        as: 'cont_id'
      });
    }
  };
  contest.init({
    cid: DataTypes.INTEGER,
    contestName: DataTypes.STRING,
    organiser: DataTypes.STRING,
    reward: DataTypes.STRING,
    venue: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    gid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'contest',
  });
  return contest;
};