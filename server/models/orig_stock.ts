import { connect } from './knex';
import { Orig_stockItem} from '../data/interfaces';

async function connection() {
    const db = await connect();
    return db;
}

async function addFromListing(orig_stock: Orig_stockItem) {
    const db = await connection();
    const procedureCall = await db.raw('CALL olisting_insert_stock_return_id(?, ?, ?, ?, ?, @inserted_id)',
    [orig_stock.orig_stock_store_user_id, orig_stock.orig_stock_watch_model_id, orig_stock.orig_stock_watch_brand_id, orig_stock.orig_stock_condition, orig_stock.orig_stock_quantity]);

    const inserted_id = await db.raw('SELECT @inserted_id as inserted_id');

    return {inserted_id: inserted_id[0][0].inserted_id, total: 1};
}

export { addFromListing };