const jwt = require('jsonwebtoken');

async function login(email, password) {
    const reg_email = await database('REG_LOG').select('*').where('reg_email', email);
    const user_id = reg_email[0].reg_user_id;
    const user_password = await database('USER').select('user_password').where('user_id', user_id);
    
}