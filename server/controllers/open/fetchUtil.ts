import { Request, Response, NextFunction } from 'express';
const expressController = require('express');
const router = expressController.Router();
const model = require('../../models/fetchUtil.ts');

router
    .get('/:table', (req: Request, res: Response, next: NextFunction) => {

        if(req.params.table == 'user' || req.params.table == 'user_info'){
            // To avoid security issues, we should not allow access to these tables.
            next({code: 403, message: 'You are not allowed to access this resource'});
        }

        model.getAll(req.params.table)
        .then(
            (result: any) => {
                const data = {data: result.objects, total: result.total, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .get('/:table/:column_id/:id', (req: Request, res: Response, next: NextFunction) => {
        
        model.getOne(req.params.table, req.params.column_id, req.params.id)
        .then(
            (result: any) => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .post('/:table', (req: Request, res: Response, next: NextFunction) => {
        model.addOne(req.params.table, req.body)
        .then(
            (result: any) => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .patch('/:table/:column_id/:id', (req: Request, res: Response, next: NextFunction) => {
        model.updateOne(req.params.table, req.params.column_id, req.params.id, req.body)
        .then(
            (result: any) => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .delete('/:table/:column_id/:id', (req: Request, res: Response, next: NextFunction) => {
        model.deleteOne(req.params.table, req.params.column_id, req.params.id)
        .then(
            (result: any) => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .get('/search/:table/:column_name/:key', (req: Request, res: Response, next: NextFunction) => {
        model.search(req.params.table, req.params.column_name, req.params.key)
        .then(
            (result: any) => {
                const data = {data: result.objects, total: result.total, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    });

module.exports = router;