import { connect } from './knex';
import { Gen_specsItem } from '../data/interfaces';

async function connection() {
    const db = await connect();
    return db;
}