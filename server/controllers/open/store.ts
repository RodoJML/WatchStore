import { Request, Response, NextFunction } from 'express';
import { StoreItem } from '../../data/interfaces';

const expressController = require('express');
const router = expressController.Router();
const model = require('../../models/store.ts');

router
    .post('/store', (req: Request, res: Response, next: NextFunction) => {
        model.addStore(req.body as StoreItem)
        .then(
            (result: boolean) => {
                const data = {data: null, isSuccess: result};
                res.send(data);
            }
        ).catch();
    })