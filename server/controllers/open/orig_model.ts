import { Request, Response, NextFunction } from 'express';
import { DataEnvelope, Orig_modelItem } from '../../data/interfaces';

const expressController = require('express');
const router = expressController.Router();
const model = require('../../models/orig_model.ts');

router
    .post('/addFromListing', (req: Request, res: Response, next: NextFunction) => {
        model.addFromListing(req.body as Orig_modelItem)
        .then(
            (result: any) => {
                const data = {data: result.inserted_id, isSuccess: true, total: result.total} as DataEnvelope<number>;
                res.send(data);
            }
        ).catch(next);
    });

module.exports = router;