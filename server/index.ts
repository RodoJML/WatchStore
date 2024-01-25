// Importing from express the request and response types
import { Request, Response, NextFunction } from 'express';

// Modules
require('dotenv').config({path:(__dirname+'/.env')});
const express = require('express');
const app = express();
const path = require('path');

// Socket
const hostname = 'localhost';
const port = 3000;

// Controllers
const fetchUtil = require('./controllers/fetchUtil.ts');
const brands = require('./controllers/brands.ts');
const login = require('./controllers/user.ts');

// Middleware
app
    // This allows us to parse JSON in the body of a request
    // In simple words it allows us to read the body of a request
    .use(express.json())

    // This is CORS
    // CORS is a security feature built into browsers that prevents a website from making a request to a different domain
    .use((req: Request, res: Response, next: NextFunction) => {
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
    .get('/api/v1', (req: Request, res: Response) => {res.send('Hello World')})
    .use('/api/v1/brands', brands)
    .use('/api/v1/fetch', fetchUtil)
    // '/api/v1/login' is the path that will be used to login
    // but is giving 404 not found because the path is not defined in the userC controller
    .use('/api/v1/login', login)
    


app.listen(port, () => console.log(`Server running at http://${hostname}:${port}/`))

// Note: At the beginning of the project "server" was used but when express got implemented now its "app"