require('dotenv').config();

const knex = require('knex')({
	client: 'mysql2',
	connection: {
		host: process.env.DEVELOPMENT_DB_HOST,
		user: process.env.DEVELOPMENT_DB_USER,
		password: process.env.DEVELOPMENT_DB_PASSWORD,
		database: process.env.DEVELOPMENT_DB_NAME,
		charset: 'utf8'
	}
});

module.exports = require('bookshelf')(knex);