// Modules
require('dotenv').config({path:(__dirname+'/.env')});
export const express = require('express');
export const router = express.Router();
const app = express();
const path = require('path');

// Socket
const hostname = 'localhost';
const port = 3000;

// Controllers
const brands = require('./controllers/brands.ts');

// Middleware
app
    // This allows us to parse JSON in the body of a request
    // In simple words it allows us to read the body of a request
    .use(express.json())

    // This is CORS
    // CORS is a security feature built into browsers that prevents a website from making a request to a different domain
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        // This is a preflight check
        // It is a request that is made before the actual request
        // It is used to check if the server allows the actual request to be made
        if (req.method === 'OPTIONS') {
            return res.status(200).send({});
        }
        next();
    })

app
    .get('/api/v1', (req, res) => {res.send('Hello World')})
    .use('/api/v1/brands', brands)


app.listen(port, () => console.log(`Server running at http://${hostname}:${port}/`))

// Note: At the beginning of the project "server" was used but when express got implemented now its "app"