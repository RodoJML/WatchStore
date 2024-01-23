import { connect } from './knex';

async function connection() {
    const db = await connect();
    return db;
}

async function getAll(table) {
    const db = await connection();
    const objects = await db(table).select('*');
    const total = objects.length;
    return {objects, total};
}

async function getOne(table, column_id, id) {
    const db = await connection();
    const object = await db(table).select('*').where(column_id, id);
    return object;
}

async function addOne(table, objct) {
    const db = await connection();
    const object = await db(table).insert(objct); //Might need update, test needed
    return object;
}

async function updateOne(table, column_id, id, objct) {
    const db = await connection();
    const object = await db(table).where(column_id, id).update(objct);
    return object;
}

async function deleteOne(table, column_id, id) {
    const db = await connection();
    const object = await db(table).where(column_id, id).del();
    return object;
}

async function search(table, colum_name, key) {
    const db = await connection();
    const objects = await db(table).select('*').where(colum_name, 'like', `%${key}%`);
    const total = objects.length;
    return { objects, total };
}

module.exports = { getAll, getOne, addOne, updateOne, deleteOne, search};