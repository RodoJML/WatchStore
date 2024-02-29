import { connect } from './knex';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
export interface UserItem {
    user_id: number,
    user_type: number,
    user_name: string,
    user_email: string,
    user_password: string | null | undefined,
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
        throw new Error('Correo no registrado');
    }

    const match = await bcrypt.compare(data.user_password, user[0].user_password);
    if (!match) {
        
        throw new Error('Contraseña incorrecta');
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

    try {
        const db = await connection();
        // All user when registring will be type 2, which is a normal user.
        // Fields set as undefined are required so the db can set the default value.
        const signedUpUser: UserItem = {
            user_id: +signupForm.user_id,
            user_type: 2,
            user_name: signupForm.user_name,
            user_email: signupForm.user_email,
            user_password: await bcrypt.hash(signupForm.user_password, 10),
            user_views: undefined,
            user_photo_path: undefined,
            user_registration_date: undefined,
        };
        await db('user').insert(signedUpUser)
        const cleanUser = { ...signedUpUser, user_password: null };
        const token = await generateTokenAsync(cleanUser, '1d');
        return { user: cleanUser, token };
    } catch (err) {
        throw new Error('Something bad happened in the backend when inserting the user: ' + err);
    }
}

async function addUnregisteredUser(form: any){

    try{
        const db = await connection();

        const unregisteredUser: UserItem = {
            user_id: +form.user_id,
            user_type: 3,
            user_name: form.name + form.lastName,
            user_email: form.user_email,
            user_password: "A$4bWp9vX2uQ5zKo",
            user_views: undefined,
            user_photo_path: "/src/assets/images/unregistered_user.png",
            user_registration_date: undefined,
        }

        return await db('user').insert(unregisteredUser);


    } catch (err) {
        throw new Error('Something bad happened in the backend when inserting the user: ' + err);
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