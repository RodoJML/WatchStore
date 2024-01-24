import { Request, Response, NextFunction } from 'express';

var expressController = require('express');
var router = expressController.Router();
var model = require('../models/brands.ts');

router
    .get('/', (req: Request, res: Response, next: NextFunction) => {
        model.getAll()
        .then(
            (result: any) => {
                const data = {data: result.objects, total: result.total, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .get('/:id', (req: Request, res: Response, next: NextFunction) => {
        model.getOne(req.params.id)
        .then(
            (result: any) => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .post('/', (req: Request, res: Response, next: NextFunction) => {
        model.addOne(req.body.name)
        .then(
            (result: any) => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .patch('/:id', (req: Request, res: Response, next: NextFunction) => {
        model.updateOne(req.params.id, req.body.name)
        .then(
            (result: any) => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .delete('/:id', (req: Request, res: Response, next: NextFunction) => {
        model.deleteOne(req.params.id)
        .then(
            (result: any) => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .get('/search/:key', (req: Request, res: Response, next: NextFunction) => {
        model.search(req.params.key)
        .then(
            (result: any) => {
                const data = {data: result.objects, total: result.total, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    });

module.exports = router;