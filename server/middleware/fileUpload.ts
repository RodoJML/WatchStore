import { Request, Response, NextFunction } from 'express';
import {listing_mainForm } from '../data/interfaces'

const multer = require('multer');
const upload = multer({dest: 'uploads/'});

interface MulterRequest extends Request {
    file: any; // Aquí puedes definir un tipo más específico si lo deseas
}


function fileUpload(){
    return ((req: Request, res: Response, next: NextFunction) => {
    
        if(req.body){        
            console.log("Entered middleware")
            console.log(req.body);
            

            // if(req.body.mainForm.step4 != undefined){
                
            //     if(req.body.mainForm.step4.photos)
                
            // } else {
            //     next();
            // }
        } else {
            next();
        }
    })
    
}

module.exports = { fileUpload }