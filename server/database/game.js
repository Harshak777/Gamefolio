const Sequelize = require("sequelize");
const db = require("db");

const Game = db.define(
    "game",
    {
      GID: {
        type: Sequelize.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: Sequelize.STRING(50),
      },
      Rules: {
          type: Sequelize.STRING(1000)
      },
      Platform: {
          type: Sequelize.STRING(50)
      }
    },
    {
      timestamps: false,
    }
  );
  
  module.exports = Game;