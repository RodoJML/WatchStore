import { Knex } from "knex";
const knex = require('knex');

const user_secret = process.env.MYSQL_USER;
const password_secret = process.env.MYSQL_PASSWORD;
const database_secret = process.env.MYSQL_DATABASE ;

const db_config = {
    client: 'mysql',
        connection: {
            host: 'localhost',
            user: user_secret,
            password: password_secret,
            database: database_secret
        }
}

const knexInstance: Knex = knex(db_config);

async function connect(): Promise<Knex>{
    return knexInstance;
}

export { connect, knexInstance as knex };

// db_connection.on('connect', () => {
//     console.log('A connection has been made!');
// });

// db_connection.on('query', query => {
//     console.log('SQL:', query.sql);
// });

// db_connection.on('query-response', response => {
//     console.log('Response:', response);
// });

// db_connection.on('error', error => {
//     console.log('Error:', error);
// });