import { connect } from './knex';
const jwt = require('jsonwebtoken');
export interface UserItem {
    user_id: number,
    user_type: number,
    user_name: string,
    user_email: string,
    user_password: string | null,
    user_views: number | null | undefined,
    user_photo: string | null | undefined,
    user_reg_date: Date | null | undefined,
}

async function connection() {
    const db = await connect();
    return db;
}

async function login(data: {user_email: string, user_password: string}) {
    
    const db = await connection();
    const user: UserItem[] = await db('user').select('*').where('user_email', data.user_email);
    
    if(user.length === 0) {
        throw new Error('Email or user not found');
    }
    if(user[0].user_password !== data.user_password) {
        throw new Error('Password is incorrect');
    }
    
    //Remember try to use bcrypt to encrypt the password
    
    // These next lines are critical for security reasons, 
    // We want to clear the user password before we send it back to the client
    const cleanUser: UserItem = { ...user[0], user_password: null };

    // We are using the cleanUser as the token subject
    const token = await generateTokenAsync(cleanUser, '1d');
    return { user: cleanUser, token };
}

async function userExist(user_name: string) {
    const db = await connection();
    const user = await db('user').count('user_name').where('user_name', user_name);
    return user.length > 0;
}

function generateTokenAsync(user: UserItem, expiresIn: string){

    return new Promise((resolve, reject) => {
        jwt.sign(user, process.env.JWT_SECRET ?? "", { expiresIn }, (err: Error, token: any) => {
            if(err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

function verifyTokenAsync(token: any){
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET ?? "", (err: Error, user: UserItem) => {
            if(err) {
                reject(err);
            } else {
                resolve(user);
            }
        })
    })
}


module.exports = { login, userExist, generateTokenAsync, verifyTokenAsync}; 