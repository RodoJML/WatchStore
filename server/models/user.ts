import { connect } from './knex';
const jwt = require('jsonwebtoken');
export interface UserItem {
    user_id: number,
    user_type: number,
    user_name: string,
    user_email: string,
    user_password: string | null,
    user_views: number | null | undefined,
    user_photo_path: string | null | undefined,
    user_registration_date: Date | null | undefined,
}

async function connection() {
    const db = await connect();
    return db;
}

async function login(data: { user_email: string, user_password: string }) {

    const db = await connection();
    const user: UserItem[] = await db('user').select('*').where('user_email', data.user_email);

    if (user.length === 0) {
        throw new Error('Email or user not found');
    }
    if (user[0].user_password !== data.user_password) {
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

async function signup(signupForm: any) {
    const db = await connection();

    // All user when registring will be type 2, which is a normal user.
    const signedUpUser: UserItem = {
        user_id: +signupForm.user_id,
        user_type: 2,
        user_name: signupForm.user_name,
        user_email: signupForm.user_email,
        user_password: signupForm.user_password,
        user_views: 0,
        user_photo_path: undefined, 
        user_registration_date: undefined, // Needs to be undefined so the db sets the default value of the timestamp
    };

    try {
        await db('user').insert(signedUpUser)
        const cleanUser = { ...signedUpUser, user_password: null };
        const token = await generateTokenAsync(cleanUser, '1d');
        return { user: signedUpUser, token };   
    } catch (err) {
        throw new Error('Something bad happened in the backend when inserting the user');
    }
}

async function exist(column: string, key: string) {
    const db = await connection();
    const user = await db('user').count('*').where(column, key);
    return user[0]['count(*)'] as number > 0;
}

function generateTokenAsync(user: UserItem, expiresIn: string) {

    return new Promise((resolve, reject) => {
        jwt.sign(user, process.env.JWT_SECRET ?? "", { expiresIn }, (err: Error, token: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

function verifyTokenAsync(token: any) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET ?? "", (err: Error, user: UserItem) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        })
    })
}


module.exports = { login, signup, exist, generateTokenAsync, verifyTokenAsync }; 