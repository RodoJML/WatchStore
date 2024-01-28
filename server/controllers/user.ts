import { Request, Response, NextFunction } from 'express';
const expressController = require('express');
const router = expressController.Router();
const model = require('../models/user.ts');
const { requireLogin } = require('../middleware/authorization.ts');

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
    .get('/exist/:table_name/:key', (req: Request, res: Response, next: NextFunction) => {
        model.userExist(req.params.table_name, req.params.key)
        .then(
            (result: boolean) => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })
    
// Export the router
module.exports = router;