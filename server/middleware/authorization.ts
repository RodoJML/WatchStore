const users = require('../models/users');

function parseAuthorizationHeader(req, next){
    const token = req.headers.authorization?.split(' ')[1];

    if(token) {
        users.verifyTokenAsync(token)
            .then(user => {req.user = user; next();})
            .catch(err => { next({ code: 401, message: err }); });
    }
    else {
        next();
    }
}

function requireLogin(requireAdmin = false){
    return (req, next) =>{
        if(req.user){
            if(req.user.user_type !== 1 && !requireAdmin){
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