import { connect } from './knex';
import { OrigModelItem } from '../data/interfaces';

async function connection() {
    const db = await connect();
    return db;
}

async function add_from_listing(orig_model_item: OrigModelItem) {
    const db = await connection();

    const procedureCall = await db.raw('CALL olisting_insert_model_return_id(?, ?, @inserted_id)',
    [orig_model_item.orig_brand_id, orig_model_item.orig_model_name]);

    const inserted_id = await db.raw('SELECT @inserted_id as inserted_id');

    return {inserted_id: inserted_id[0][0].inserted_id, total: 1};
}

export { add_from_listing };