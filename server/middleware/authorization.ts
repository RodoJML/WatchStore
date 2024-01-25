import { Request, Response, NextFunction } from 'express';

const users = require('../models/user');

function parseAuthorizationHeader(req: Request, next: NextFunction){
    const token = req.headers.authorization?.split(' ')[1];

    if(token) {
        users.verifyTokenAsync(token)
            .then((user: any) => {req.body.user = user; next();}) // Check this function later!!! 
            .catch((err: any) => { next({ code: 401, message: err }); });
    }
    else {
        next();
    }
}

function requireLogin(requireAdmin = false){
    return (req: Request, next: NextFunction) =>{
        if(req.body.user){
            if(req.body.user.user_type !== 1 && !requireAdmin){
                next({code: 403, message: 'You are not allowed to access this resource'});
                // Code 403 means forbidden
            } else {
                next();
            }
        } else {
            next({code: 401, message: 'You need to login to access this resource'});
            // Code 401 means unauthorized
        }
    }
}

module.exports = { parseAuthorizationHeader, requireLogin };