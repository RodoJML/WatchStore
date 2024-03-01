import { Request, Response, NextFunction } from 'express';
import { DataEnvelope, Orig_ModelItem } from '../../data/interfaces';

const expressController = require('express');
const router = expressController.Router();
const model = require('../../models/orig_model.ts');

router
    .post('/add_from_listing', (req: Request, res: Response, next: NextFunction) => {
        model.add_from_listing(req.body as Orig_ModelItem)
        .then(
            (result: any) => {
                const data = {data: result.inserted_id, isSuccess: true, total: result.total};
                res.send(data);
            }
        ).catch(next);
    });

module.exports = router;