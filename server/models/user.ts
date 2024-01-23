import database from './knex';
const jwt = require('jsonwebtoken');

async function login(email, password) {

    const user = await database('user').select('*').where('user_email', email); 
    
    if(!user) {
        throw new Error('Email or user not found');
    }
    if(user[0].user_password !== password) {
        throw new Error('Password is incorrect');
    }
    
    // These next lines are critical for security reasons, 
    // We want to clear the user password before we send it back to the client
    const cleanUser = { ...user[0], user_password: undefined };

    // We are using the cleanUser as the token subject
    const token = await generateTokenAsync(cleanUser, '24h');
    return { user: cleanUser, token };
}


function generateTokenAsync(user, expiresIn){
    return new Promise((resolve, reject) => {
        jwt.sign(user, process.env.JWT_SECRET ?? "", { expiresIn }, (err, token) => {
            if(err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

function verifyTokenAsync(token){
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET ?? "", (err, user) => {
            if(err) {
                reject(err);
            } else {
                resolve(user);
            }
        })
    })
}


module.exports = { login }; 