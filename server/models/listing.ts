import { connect } from './knex';

async function connection() {
    const db = await connect();
    return db;
}

async function getAll() {
    const db = await connection();
    const objects = await db('listing').select('*');
    const total = objects.length;
    return {objects, total};
}

async function getAllbyPage(page = 1, pageSize = 30) {
    const db = await connection();
    const objects = await db('listing').select('*').offset((page - 1) * pageSize).limit(pageSize);
    const total = objects.length;
    return {objects, total};
}

async function getOne(listing_stock_id: number, listing_stock_user_id: number) {
    const db = await connection();
    const object = await db('listing')
    .select('*')
    .where('listing_stock_id', listing_stock_id)
    .andWhere('listing_stock_user_id', listing_stock_user_id);
    return object;
}

async function addOne(objct: Object) {
    const db = await connection();
    const object = await db('listing').insert(objct);
    return object;
}

async function updateOne(listing_stock_id: number, listing_stock_user_id: number, objct: Object) {
    const db = await connection();
    const object = await db('listing')
    .where('listing_stock_id', listing_stock_id)
    .andWhere('listing_stock_user_id', listing_stock_user_id)
    .update(objct);
    return object;
}

async function deleteOne(listing_stock_id: number, listing_stock_user_id: number) {
    const db = await connection();
    const object = await db('listing')
    .where('listing_stock_id', listing_stock_id)
    .andWhere('listing_stock_user_id', listing_stock_user_id)
    .del();
    return object;
}

async function search(table: string, colum_name: string, key: string) {
    const db = await connection();
    const objects = await db(table).select('*').where(colum_name, 'like', `%${key}%`);
    const total = objects.length;
    return { objects, total };
}

module.exports = { getAll, getAllbyPage, getOne, addOne, updateOne, deleteOne, search};