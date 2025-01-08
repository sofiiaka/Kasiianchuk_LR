const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('kasiianchuk_LR1', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;