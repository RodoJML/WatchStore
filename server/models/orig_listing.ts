import { connect } from './knex';
import { Orig_listingItem } from '../data/interfaces';

async function connection() {
    const db = await connect();
    return db;
}

async function addFromListing(orig_listing: Orig_listingItem) {
    const db = await connection();
    const result = await db('orig_listing').insert(orig_listing);
    const insertedProperly = result.length > 0;
    const total = result.length;
    
    return {insertedProperly, total};
}

export { addFromListing };