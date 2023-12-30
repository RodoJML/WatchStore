const { connect } = require('./knex.tsx');
const TABLE_NAME = 'brands';

async function connnection () {
    const db = await connect();
    return db;
}

async function getAll() {
    const table = await connnection();
    const objects = await table(TABLE_NAME).select('*');
    return objects;
}

module.exports = { getAll };