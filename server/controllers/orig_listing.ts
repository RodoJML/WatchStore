import { Request, Response, NextFunction } from 'express';

const expressController = require('express');
const router = expressController.Router();
const model = require('../models/orig_listing.ts');

router
    .get('/', (req: Request, res: Response, next: NextFunction) => {
    model.getAll()
        .then(
            (result: any) => {
                const data = { data: result.objects, total: result.total, isSuccess: true };
                res.send(data);
            }
        ).catch(next);
    })
    .get('/previews', (req: Request, res: Response, next: NextFunction) => {
        model.getAll_previews()
        .then(
            (result: any) => {
                const data = { data: result, isSuccess: true };
                res.send(data);
            }
        ).catch(next);
    })
    .get('/:listing_stock_id/:listing_stock_user_id', (req: Request, res: Response, next: NextFunction) => {
        model.getOne(req.params.listing_stock_id, req.params.listing_stock_user_id)
        .then(
            (result: any) => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .post('/', (req: Request, res: Response, next: NextFunction) => {
        model.addOne(req.body)
        .then(
            (result: any) => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .patch('/:listing_stock_id/:listing_stock_user_id', (req: Request, res: Response, next: NextFunction) => {
        model.updateOne(req.params.listing_stock_id, req.params.listing_stock_user_id, req.body)
        .then(
            (result: any) => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })

    .delete('/:listing_stock_id/:listing_stock_user_id', (req: Request, res: Response, next: NextFunction) => {
        model.deleteOne(req.params.listing_stock_id, req.params.listing_stock_user_id)
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