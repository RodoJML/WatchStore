const { connect } = require('./knex.tsx');
const TABLE_NAME = 'brands';

async function database_connection() {
    const db = await connect();
    return db;
}

async function getAll() {
    const database = await database_connection();
    const objects = await database(TABLE_NAME).select('*');
    const total = objects.length;
    return {objects, total};
}

module.exports = { getAll };