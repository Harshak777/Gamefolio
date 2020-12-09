const { Sequelize } = require('sequelize');

const sqlConfig = {
    username: 'root',
    password: '',
    database: 'gamefolio',
    host: 'localhost',
    dialect: 'mysql',
  };

  const sequelize = new Sequelize(sqlConfig);

async function auth() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        } catch (error) {
        console.error('Unable to connect to the database:', error);
        }
}

auth();