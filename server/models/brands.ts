
// Cannot use import statement outside a module then we have to use require
// const { userConnection } = require("./user");

// async function getAll() {
//     const objects = await database('brand').select('*');
//     const total = objects.length;
//     return {objects, total};
// }

// async function brands_getOne(id) {
//     const database = await database_connection();
//     const object = await database('brand').select('*').where('brand_id', id);
//     return object;
// }

// async function brands_addOne(name) {
//     const database = await database_connection();
//     const object = await database('brand').insert({brand_name: name});
//     return object;
// }

// async function brands_updateOne(id, name) {
//     const database = await database_connection();
//     const object = await database('brand').where('id', id).update({brand_name: name});
//     return object;
// }

// async function brands_deleteOne(id) {
//     const database = await database_connection();
//     const object = await database('brand').where('id', id).del();
//     return object;
// }

// async function brands_search(key) {
//     const database = await database_connection();
//     const objects = await database('brand').select('*').where('brand_name', 'like', `%${key}%`);
//     const total = objects.length;
//     return { objects, total };
// }

module.exports = { getAll};
// module.exports = { brands_getAll, brands_getOne, brands_addOne, brands_updateOne, brands_deleteOne, brands_search};