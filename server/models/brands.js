const { connect } = require('./mysql');

const TABLE_NAME = 'brands';

async function getBrands() {
    const database = await connect();
    const query = `SELECT * FROM ${TABLE_NAME}`;
    
    database.query(query, (err, result) => {
        if (err) throw err;
        return result;
    })
}

module.exports = { getBrands }
