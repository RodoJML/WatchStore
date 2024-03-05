import { connect } from './knex';
import { Gen_stockItem } from '../data/interfaces';

async function connection() {
    const db = await connect();
    return db;
}

async function addFromListing(gen_stock: Gen_stockItem) {
    const db = await connection();
    const procedureCall = await db.raw('CALL glisting_insert_stock_return_id(?, ?, ?, ?, ?, @inserted_id)',
    [gen_stock.gen_stock_store_user_id, gen_stock.gen_stock_watch_model_id, gen_stock.gen_stock_watch_brand_id, gen_stock.gen_stock_condition, gen_stock.gen_stock_quantity]);

    const inserted_id = await db.raw('SELECT @inserted_id as inserted_id');

    return {inserted_id: inserted_id[0][0].inserted_id, total: 1};
}

export { addFromListing };