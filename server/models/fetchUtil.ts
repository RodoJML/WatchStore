import { connect } from './knex';
const data1 = require('../data/provinces.json');
const data2 = require('../data/colors.json');
const data3 = require('../data/sizes.json');

async function connection() {
    const db = await connect();
    return db;
}

async function getAll(table: string) {
    if(table === 'provinces') return { objects: data1.provinces, total: data1.provinces.length };
    if(table === 'colors') return { objects: data2.colors, total: data2.colors.length };
    if(table === 'sizes') return { objects: data3.sizes, total: data3.sizes.length };

    const db = await connection();
    const objects = await db(table).select('*');
    const total = objects.length;
    return {objects, total};
}

// offset((page - 1) * pageSize).limit(pageSize) FOR PAGINATION
async function getAllbyPage(table: string, page = 1, pageSize = 30) {
    const db = await connection();
    const objects = await db(table).select('*').offset((page - 1) * pageSize).limit(pageSize);
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

module.exports = { getAll, getAllbyPage, getOne, addOne, updateOne, deleteOne, search};