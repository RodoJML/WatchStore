const expressController = require('express');
const router = expressController.Router();
const model_brand = require('../models/brands.ts');

router
    .get('/', (req, res, next) => {
        model_brand.getAll()
        .then(
            result => {
                const data = {data: result.objects, total: result.total, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .get('/:id', (req, res, next) => {
        model_brand.getOne(req.params.id)
        .then(
            result => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .post('/', (req, res, next) => {
        model_brand.addOne(req.body.name)
        .then(
            result => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .patch('/:id', (req, res, next) => {
        model_brand.updateOne(req.params.id, req.body.name)
        .then(
            result => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .delete('/:id', (req, res, next) => {
        model_brand.deleteOne(req.params.id)
        .then(
            result => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .get('/search/:key', (req, res, next) => {
        model_brand.search(req.params.key)
        .then(
            result => {
                const data = {data: result.objects, total: result.total, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    });

module.exports = router;