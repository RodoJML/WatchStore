const express = require('express');
const router = express.Router();
const model = require('../models/brands');

router
    .get('/getAll', (req, res, next) => {
        model.getAll()
        .then(
            result => {
                const data = {data: result, total: size, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .get('/getOne/:id', (req, res, next) => {
        model.getOne(req.params.id)
        .then(
            result => {
                const data = {data: result, total: size, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .post('/addOne', (req, res, next) => {
        model.addOne(req.body)
        .then(
            result => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

module.exports = router;