import { Request, Response, NextFunction } from 'express';
import { DataEnvelope, OrigModelItem } from '../data/interfaces';

const expressController = require('express');
const router = expressController.Router();
const model = require('../models/orig_model.ts');

router
    .post('/add_from_listing', (req: Request, res: Response, next: NextFunction) => {
        model.add_from_listing(req.body as OrigModelItem)
        .then(
            (result: any) => {
                const data = {data: result.inserted_id, isSuccess: true, total: result.total};
            }
        ).catch();
    })