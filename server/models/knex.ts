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

export async function database_connection() {
    const db = await connect();
    return db;
}

module.exports = { connect, knex, database_connection };