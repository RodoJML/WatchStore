import { connect } from './knex';
import { StoreItem } from '../data/interfaces';

async function connection() {
    const db = await connect();
    return db;
}

async function addStore(store: StoreItem) {
    const db = await connection();
    const result = await db('store').insert(store);
    return result.length > 0;
}

export { addStore };