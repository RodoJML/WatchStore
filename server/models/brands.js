const { connect } = require('./mysql');

const TABLE_NAME = 'brands';

async function getBrands() {

    const connection = await connect();

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${TABLE_NAME}`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

module.exports = { getBrands }
