import { Request, Response, NextFunction } from 'express';
const expressController = require('express');
const router = expressController.Router();
const model = require('../../models/user.ts');
const { requireLogin } = require('../../middleware/authorization.ts');

router
    .post('/login', (req: Request, res: Response, next: NextFunction) => {
        model.login(req.body)
        .then(
            (result: any) => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })
    .post('/signup', (req: Request, res: Response, next: NextFunction) => {
        model.signup(req.body)
        .then(
            (result: any) => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })
    .post('/addFromListing', (req: Request, res: Response, next: NextFunction) => {
        model.addFromListing(req.body)
        .then(
            (result: any) => {
                const data = {data: result.insertedSuccesfully, isSuccess: result.insertedSuccesfully, total: result.total};
                res.send(data);
            }
        ).catch(next);
    })
    .post('/userInfo', (req:Request, res: Response, next: NextFunction) => {

    })
    .get('/exist/:table_name/:key', (req: Request, res: Response, next: NextFunction) => {
        model.exist(req.params.table_name, req.params.key)
        .then(
            (result: boolean) => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })
    
// Export the router
module.exports = router;