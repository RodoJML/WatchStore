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

async function getOne(id) {
    const database = await database_connection();
    const object = await database(TABLE_NAME).select('*').where('id', id);
    const total = object.length;
    return {object, total};
}

async function addOne(name) {
    const database = await database_connection();
    const object = await database(TABLE_NAME).insert({name: name});
    return object;
}

module.exports = { getAll };