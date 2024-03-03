import { Request, Response, NextFunction } from 'express';
import { DataEnvelope, Orig_listingItem } from '../../data/interfaces';

const expressController = require('express');
const router = expressController.Router();
const model = require('../../models/orig_listing.ts');

router
    .post('/addFromListing', (req: Request, res: Response, next: NextFunction) => {
        model.addFromListing(req.body as Orig_listingItem)
        .then(
            (result: any) => {
                const data = {data: result.insertedProperly, isSuccess: result.insertedProperly, total: result.total} as DataEnvelope<boolean>;
                res.send(data);
            }
        ).catch(next);
    });

module.exports = router;