import { Request, Response, NextFunction } from 'express';
import { StoreItem } from '../../data/interfaces';

const expressController = require('express');
const router = expressController.Router();
const model = require('../../models/store.ts');

router
    .post('/addFromListing', (req: Request, res: Response, next: NextFunction) => {
        model.addFromListing(req.body as StoreItem)
        .then(
            (result: any) => {
                const data = {data: result.insertedProperly, isSuccess: result.insertedProperly , total: result.total};
                res.send(data);
            }
        ).catch();
    })

    module.exports = router;