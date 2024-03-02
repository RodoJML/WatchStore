import { Request, Response, NextFunction } from 'express';
import { DataEnvelope, Original_specsItem } from '../../data/interfaces';

const expressController = require('express');
const router = expressController.Router();
const model = require('../../models/original_specs.ts');

router
.post('/addFromListing', (req: Request, res: Response, next: NextFunction) => {
    model.addFromListing(req.body as Original_specsItem)
    .then(
        (result: any) => {
            const data = {data: result.insertedProperly, isSuccess: result.insertedProperly, total: result.total} as DataEnvelope<number>;
            res.send(data);
        }
    ).catch(next);
});

module.exports = router;