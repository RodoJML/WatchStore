import { connect } from './knex';
import { Gen_modelItem } from '../data/interfaces';

async function connection() {
    const db = await connect();
    return db;
}

async function addFromListing(gen_model_item: Gen_modelItem) {
    const db = await connection();

    const procedureCall = await db.raw('CALL glisting_insert_model_return_id(?, ?, ?, ?, ?, @inserted_id)',
    [gen_model_item.gen_brand_id, gen_model_item.gen_model_name, gen_model_item.gen_description, gen_model_item.gen_country_id, gen_model_item.gen_certification]);

    const inserted_id = await db.raw('SELECT @inserted_id as inserted_id');

    return {inserted_id: inserted_id[0][0].inserted_id, total: 1};
}

export { addFromListing };