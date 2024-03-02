import { connect } from './knex';
import { StoreItem } from '../data/interfaces';

async function connection() {
    const db = await connect();
    return db;
}

async function addFromListing(store: StoreItem) {
    const db = await connection();
    const result = await db('store').insert(store);
    const insertedProperly = result.length > 0;
    const total = result.length;

    return {insertedProperly, total};
}

export { addFromListing };