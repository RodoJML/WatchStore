import { database_connection } from './knex.ts';

async function getAll() {
    const database = await database_connection();
    const objects = await database('brand').select('*');
    const total = objects.length;
    database
    return {objects, total};
}

async function getOne(id) {
    const database = await database_connection();
    const object = await database('brand').select('*').where('brand_id', id);
    return object;
}

async function addOne(name) {
    const database = await database_connection();
    const object = await database('brand').insert({brand_name: name});
    return object;
}

async function updateOne(id, name) {
    const database = await database_connection();
    const object = await database('brand').where('id', id).update({brand_name: name});
    return object;
}

async function deleteOne(id) {
    const database = await database_connection();
    const object = await database('brand').where('id', id).del();
    return object;
}

async function search(key) {
    const database = await database_connection();
    const objects = await database('brand').select('*').where('brand_name', 'like', `%${key}%`);
    const total = objects.length;
    return { objects, total };
}

module.exports = { getAll, getOne, addOne, updateOne, deleteOne, search};