import { Request, Response, NextFunction } from 'express';
import {listing_mainForm } from '../data/interfaces'

const multer = require('multer');
const upload = multer({dest: './uploads'});

interface MulterRequest extends Request {
    files: any; // Aquí puedes definir un tipo más específico si lo deseas
}

function fileUpload(){
    return (req: Request, res:Response, next: NextFunction) => {
        if(req.body.mainForm){
            if(req.body.mainForm.step4 != undefined){
                console.log("possible photos attached")
            } else {
                next();
            }
        } else {
            next();
        }
    }
    
}

module.exports = { fileUpload }