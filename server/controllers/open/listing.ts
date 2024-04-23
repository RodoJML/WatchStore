import { Request, Response, NextFunction } from 'express';
import { Multer } from 'multer';

const expressController = require('express');
const router = expressController.Router();
const model = require('../../models/listing.ts');

const multer = require('multer');
const upload = multer({dest: 'uploads/'});

interface MulterRequest extends Request {
    files: Express.Multer.File[];
}

router
    .get('/', (req: Request, res: Response, next: NextFunction) => {
        model.getAll()
            .then(
                (result: any) => {
                    const data = { data: result.objects, isSuccess: true, total: result.total };
                    res.send(data);
                }
            ).catch(next);
    })

    .get('/previews', (req: Request, res: Response, next: NextFunction) => {
        model.get_previews(req.query.page as number | undefined, req.query.pageSize as number | undefined,
            req.query.key as string | undefined)
            // In the model the page and number is defined that if no query is passed it will default to 1 and 5 respectively
            .then(
                (result: any) => {
                    // Listing type referes to if its a new(1) or used(2) listing
                    const data = { data: result.objects, isSuccess: true, total: result.total };
                    res.send(data);
                }
            ).catch(next);
    })

    .get('/:listing_stock_id/:listing_stock_user_id', (req: Request, res: Response, next: NextFunction) => {
        model.getOne(req.params.listing_stock_id, req.params.listing_stock_user_id)
            .then(
                (result: any) => {
                    const data = { data: result, isSuccess: true };
                    res.send(data);
                }
            ).catch(next);
    })

    .get('/guestHasListing', (req: Request, res: Response, next: NextFunction) => {
        model.guestHasListing(req.query.key)
            .then(
                (result: any) => {
                    const data = { data: result.objects, isSuccess: true, total: result.total };
                    res.send(data);
                }
            ).catch(next);
    })

    .post('/', (req: Request, res: Response, next: NextFunction) => {
        model.addOne(req.body)
            .then(
                (result: any) => {
                    const data = { data: result, isSuccess: true };
                    res.send(data);
                }
            ).catch(next);
    })

    .post('/addPhotos', upload.array('photos', 5), (req: MulterRequest, res: Response, next: NextFunction) => {
        
        model.addPhotos(req.files)
            .then(
                (result: any) => {
                    const data = { data: result.data, isSuccess: true };
                    res.send(data);
                }
            ).catch(next);
    })

    .post('/unregistered_addListing', (req: Request, res: Response, next: NextFunction) => {
        model.unregistered_addListing(req.body).then(
            (result: any) => {
                const data = { data: result.data, isSuccess: result.insertedSuccessfully, total: result.total };
                res.send(data);
            }
        ).catch(next);
    })

    .patch('/:listing_stock_id/:listing_stock_user_id', (req: Request, res: Response, next: NextFunction) => {
        model.updateOne(req.params.listing_stock_id, req.params.listing_stock_user_id, req.body)
            .then(
                (result: any) => {
                    const data = { data: result, isSuccess: true };
                    res.send(data);
                }
            ).catch(next);
    })

    .delete('/:listing_stock_id/:listing_stock_user_id', (req: Request, res: Response, next: NextFunction) => {
        model.deleteOne(req.params.listing_stock_id, req.params.listing_stock_user_id)
            .then(
                (result: any) => {
                    const data = { data: result, isSuccess: true };
                    res.send(data);
                }
            ).catch(next);
    })

    .get('/search/:key', (req: Request, res: Response, next: NextFunction) => {
        model.search(req.params.key)
            .then(
                (result: any) => {
                    const data = { data: result.objects, total: result.total, isSuccess: true };
                    res.send(data);
                }
            ).catch(next);
    });

module.exports = router;