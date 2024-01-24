import { connect } from './knex';

async function connection() {
    const db = await connect();
    return db;
}

async function getAll(table: string) {
    const db = await connection();
    const objects = await db(table).select('*');
    const total = objects.length;
    return {objects, total};
}

async function getOne(table:string, column_id: string, id: string) {
    const db = await connection();
    const object = await db(table).select('*').where(column_id, id);
    return object;
}

async function addOne(table: string, objct: Object) {
    const db = await connection();
    const object = await db(table).insert(objct); //Might need update, test needed
    return object;
}

async function updateOne(table: string, column_id: string, id: string, objct: Object) {
    const db = await connection();
    const object = await db(table).where(column_id, id).update(objct);
    return object;
}

async function deleteOne(table: string, column_id: string, id: string) {
    const db = await connection();
    const object = await db(table).where(column_id, id).del();
    return object;
}

async function search(table: string, colum_name: string, key: string) {
    const db = await connection();
    const objects = await db(table).select('*').where(colum_name, 'like', `%${key}%`);
    const total = objects.length;
    return { objects, total };
}

module.exports = { getAll, getOne, addOne, updateOne, deleteOne, search};