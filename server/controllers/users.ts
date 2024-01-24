import { Request, Response, NextFunction } from 'express';
const expressController = require('express');
const router = expressController.Router();
const model = require('../models/users.ts');
const { requireLogin } = require('../middleware/authorization.ts');

router
    .post('/login', (req: Request, res: Response, next: NextFunction) => {
        model.login(req.body.email, req.body.password)
        .then(
            (result: any) => {
                const data = {data: result, isSuccess: true};
                res.send(data);
            }
        ).catch(next);
    })