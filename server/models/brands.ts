const { connection } = require('./knex.ts');
const TABLE_NAME = 'brands';

async function database_connection() {
    const db = await connection();
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
    return object;
}

async function addOne(name) {
    const database = await database_connection();
    const object = await database(TABLE_NAME).insert({brand_name: name});
    return object;
}

async function updateOne(id, name) {
    const database = await database_connection();
    const object = await database(TABLE_NAME).where('id', id).update({brand_name: name});
    return object;
}

async function deleteOne(id) {
    const database = await database_connection();
    const object = await database(TABLE_NAME).where('id', id).del();
    return object;
}

async function search(key) {
    const database = await database_connection();
    const objects = await database(TABLE_NAME).select('*').where('brand_name', 'like', `%${key}%`);
    const total = objects.length;
    return { objects, total };
}

module.exports = { getAll, getOne, addOne, updateOne, deleteOne, search};