import { database_connection } from "./knex";

async function getAll() {
    const database = await database_connection();
    const objects = await database("listing").select("*");
    const total = objects.length;
    database;
    return { objects, total };
}

module.exports = { getAll };