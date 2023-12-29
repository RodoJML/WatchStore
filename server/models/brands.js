const { connect } = require('./mysql');

const TABLE_NAME = 'brands';

// Create a function called getAll() that returns a promise
// Inside the function:
// Create a connection to the database by calling connect()
// Create a query to select all rows from the brands table
// Execute the query by calling connection.query()
// Return a promise that resolves with the result of the query
// Close the connection to the database by calling connection.end()
// Export the getAll() function

async function getAll() {
    const connection = await connect();
    const query = `SELECT * FROM ${TABLE_NAME}`;

    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) reject(err);
            size = result.length;
            resolve(result, size);
        });
        connection.end(console.log('Connection closed'));
    });
}

// From here on all functions use similar code as getAll()

async function getOne(id) {
    const connection = await connect();
    const query = `SELECT * FROM ${TABLE_NAME} WHERE brand_id = ${id}`;

    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) reject(err);
            size = result.length;
            resolve(result, size);
        });
        connection.end(console.log('Connection closed'));
    });
}


async function addOne(name) {
    const connection = await connect();
    const query = `INSERT INTO ${TABLE_NAME} (brand_name) VALUES ('${name}')`;

    return new Promise((resolve, reject) => {
        connection.execute(query, (err, result) => {
            if (err) reject(err);
            affectedRows = result.affectedRows;
            insertedId = result.insertId;

            resolve(result, affectedRows, insertedId);
        });
        connection.end(console.log('Connection closed'));
    });
}

module.exports = { getAll, getOne, addOne }


// The different sql functions are:
// connection.query() - for queries that return a result set
// connection.execute() - for queries that do not return a result set
// connection.beginTransaction() - for transactions
// connection.commit() - for committing transactions
// connection.rollback() - for rolling back transactions
// connection.end() - for closing the connection
// connection.destroy() - for destroying the connection
// connection.pause() - for pausing the connection
// connection.resume() - for resuming the connection
// connection.escape() - for escaping query values
// connection.escapeId() - for escaping query identifiers
// connection.format() - for formatting queries
// connection.changeUser() - for changing the user
// connection.ping() - for pinging the server
// connection.statistics() - for retrieving server statistics

// connection.execute() - for queries that do not return a result set
    // the return value is an object with the following properties:
        // affectedRows - the number of affected rows
        // insertId - the insert id
        // warningStatus - the warning status
        // changedRows - the number of changed rows
        // message - the message
        // protocol41 - whether the protocol is 4.1
        // serverStatus - the server status
        // warningCount - the warning count


// To test post using a http file would be:
// POST http://localhost:3000/brands/addOne
// Content-Type: application/json
//
// {
//     "brand_name": "Test Brand"
// }
// To run this test you need to install the REST Client extension for VS Code.