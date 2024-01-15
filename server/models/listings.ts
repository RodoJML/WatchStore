// async function database_connection() {
//     const { connect } = require('./knex.ts');
//     const db = await connect();
//     return db;
// }

// async function getAll() {
//     const database = await database_connection();
//     const objects = await database("listing").select("*");
//     const total = objects.length;
//     database;
//     return { objects, total };
// }

// module.exports = { getAll };