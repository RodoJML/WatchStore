const knex = require('knex');

const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const db = process.env.MYSQL_DATABASE ;

async function connect() {
    const database = await knex({
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: user,
            password: password,
            database: db
        }
    });
    return database;
}

module.exports = { connect, knex };