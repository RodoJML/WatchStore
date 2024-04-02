import { Request, Response, NextFunction } from 'express';
import {listing_mainForm } from '../data/interfaces'

const multer = require('multer');
const upload = multer({dest: 'uploads/'});

interface MulterRequest extends Request {
    file: any; // Aquí puedes definir un tipo más específico si lo deseas
}


function fileUpload(){
    return (upload.single('photos'), (req: MulterRequest, res: Response, next: NextFunction) => {
    
        if(req.file){        
            console.log("File Detected")
            console.log(req.file);
        } else {
            next();
        }
    })
    
}

module.exports = { fileUpload }