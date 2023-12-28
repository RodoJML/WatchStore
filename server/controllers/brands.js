const express = require('express');
const router = express.Router();
const model = require('../models/brands');

router
    .get('/', (req, res, next) => {
        model.getBrands()
        .then(
            result => {
                const data = {data: result, count: result.length, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

module.exports = router;