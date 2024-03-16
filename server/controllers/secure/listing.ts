import { Request, Response, NextFunction } from 'express';

const expressController = require('express');
const router = expressController.Router();
const model = require('../../models/listing.ts');

router
    .post('/registered_addListing', (req: Request, res: Response, next: NextFunction) => {
        model.unregistered_addListing(req.body.listing_mainForm).then(
            (result: any) => {
                const data = { data: result.data, isSuccess: result.insertedSuccessfully, total: result.total };
                res.send(data);
            }
        ).catch(next);
    })

    .get('/securitytest',  (req: Request, res: Response, next: NextFunction) => {
        
        try{
            res.send("This is visible only if logged in");
        } catch{(next)};
        
        

    });

module.exports = router;