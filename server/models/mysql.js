require('dotenv').config();
const mysql = require('mysql');
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;

function connect() {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: user,
            password: password,
            database: database
        });

        connection.connect((err) => {
            if (err) reject(err);
            resolve(connection);
        });
    });
}

module.exports = { connect, mysql, database };