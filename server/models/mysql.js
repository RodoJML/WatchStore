const mysql = require('mysql');
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;

async function connect() {
    
    const database = mysql.createConnection({
        host: 'localhost',
        user: user,
        password: password,
        database: database
    });

    return database;
}


module.exports = { connect, mysql, database };