async function database_connection() {
    const { connect } = require('./knex.ts');
    const db = await connect();
    return db;
}

async function getAll(table) {
    const database = await database_connection();
    const objects = await database(table).select('*');
    const total = objects.length;
    return {objects, total};
}

async function getOne(table, column_id, id) {
    const database = await database_connection();
    const object = await database(table).select('*').where(column_id, id);
    return object;
}

async function addOne(table, objct) {
    const database = await database_connection();
    const object = await database(table).insert(objct); //Might need update, test needed
    return object;
}

async function updateOne(table, column_id, id, objct) {
    const database = await database_connection();
    const object = await database(table).where(column_id, id).update(objct);
    return object;
}

async function deleteOne(table, column_id, id) {
    const database = await database_connection();
    const object = await database(table).where(column_id, id).del();
    return object;
}

async function search(table, colum_name, key) {
    const database = await database_connection();
    const objects = await database(table).select('*').where(colum_name, 'like', `%${key}%`);
    const total = objects.length;
    return { objects, total };
}

module.exports = { getAll, getOne, addOne, updateOne, deleteOne, search, updateOne1};