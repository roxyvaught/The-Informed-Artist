// import the sequelize constructor from the library
const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to our database, use .ENV file for user, pass, and database
let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize('tech_blog_db', 'root', {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

module.exports = sequelize;