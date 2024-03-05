import { connect } from './knex';
import { Gen_listingItem } from '../data/interfaces';

async function connection() {
    const db = await connect();
    return db;
}

async function addFromListing(gen_listing: Gen_listingItem) {
    const db = await connection();
    const result = await db('gen_listing').insert(gen_listing);
    const insertedProperly = result.length > 0;
    const total = result.length;
    
    return {insertedProperly, total};
}

export { addFromListing };