import { connect } from './knex';
import { Original_specsItem } from '../data/interfaces';

async function connection() {
    const db = await connect();
    return db;
}

async function addFromListing(original_specs: Original_specsItem) {
    const db = await connection();
    const result = await db('original_specs').insert(original_specs);
    const insertedProperly = result.length > 0;
    const total = result.length;
    
    return {insertedProperly, total};
}

export { addFromListing };