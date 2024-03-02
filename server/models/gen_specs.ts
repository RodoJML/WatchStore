import { connect } from './knex';
import { Gen_specsItem } from '../data/interfaces';

async function connection() {
    const db = await connect();
    return db;
}

async function addFromListing(gen_specs: Gen_specsItem) {
    const db = await connection();
    const result = await db('gen_specs').insert(gen_specs);
    const insertedProperly = result.length > 0;
    const total = result.length;
    
    return {insertedProperly, total};
}

export { addFromListing };