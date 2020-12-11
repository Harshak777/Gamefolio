'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      team.belongsToMany(models.participant, {
        foreignKey: 'tid',
        as: 'team_id'
      });

      team.hasMany(models.winner, {
        foreignKey: 'tid',
        as: 'team_id'
      });
    }
  };
  team.init({
    tid: DataTypes.INTEGER,
    name: DataTypes.STRING,
    referral: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'team',
  });
  return team;
};