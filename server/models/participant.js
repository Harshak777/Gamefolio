'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      participant.belongsTo(models.user, {
        foreignKey: 'uid',
        as: 'user_id'
      });

      participant.belongsTo(models.team, {
        foreignKey: 'tid',
        as: 'team_id'
      });

      participant.belongsTo(models.contest, {
        foreignKey: 'cid',
        as: 'contest_id'
      });
    }
  };
  participant.init({
    cid: DataTypes.INTEGER,
    tid: DataTypes.INTEGER,
    uid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'participant',
  });
  return participant;
};