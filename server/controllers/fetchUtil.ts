var expressController = require('express');
var router = expressController.Router();
var model = require('../models/fetchUtil.ts');

router
    .get('/:table', (req, res, next) => {
        model.getAll(req.params.table)
        .then(
            result => {
                const data = {data: result.objects, total: result.total, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .get('/:table/:column_id/:id', (req, res, next) => {
        model.getOne(req.params.table, req.params.column_id, req.params.id)
        .then(
            result => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .post('/:table', (req, res, next) => {
        model.addOne(req.params.table, req.body)
        .then(
            result => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .patch('/:table/:column_id/:id', (req, res, next) => {
        model.updateOne(req.params.table, req.params.column_id, req.params.id, req.body)
        .then(
            result => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .patch('/:table', (req, res, next) => {
        model.updateOne1(req.params.table, req.body)
        .then(
            result => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .delete('/:table/:column_id/:id', (req, res, next) => {
        model.deleteOne(req.params.table, req.params.column_id, req.params.id)
        .then(
            result => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .get('/search/:table/:column_name/:key', (req, res, next) => {
        model.search(req.params.table, req.params.column_name, req.params.key)
        .then(
            result => {
                const data = {data: result.objects, total: result.total, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    });

module.exports = router;