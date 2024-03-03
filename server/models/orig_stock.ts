import { connect } from './knex';
import { Orig_stockItem} from '../data/interfaces';

async function connection() {
    const db = await connect();
    return db;
}

async function addFromListing(orig_stock: Orig_stockItem) {
    const db = await connection();
    const result = await db('orig_stock').insert(orig_stock);
    const insertedProperly = result.length > 0;
    const total = result.length;
    
    return {insertedProperly, total};
}

export { addFromListing };