var expressController = require('express');
var router = expressController.Router();
var model = require('../models/brands.ts');

router
    .get('/', (req, res, next) => {
        model.getAll()
        .then(
            result => {
                const data = {data: result.objects, total: result.total, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .get('/:id', (req, res, next) => {
        model.getOne(req.params.id)
        .then(
            result => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .post('/', (req, res, next) => {
        model.addOne(req.body.name)
        .then(
            result => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .patch('/:id', (req, res, next) => {
        model.updateOne(req.params.id, req.body.name)
        .then(
            result => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .delete('/:id', (req, res, next) => {
        model.deleteOne(req.params.id)
        .then(
            result => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .get('/search/:key', (req, res, next) => {
        model.search(req.params.key)
        .then(
            result => {
                const data = {data: result.objects, total: result.total, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    });

module.exports = router;