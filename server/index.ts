// Importing from express the request and response types
import { Request, Response, NextFunction } from 'express';

// Modules
require('dotenv').config({ path: (__dirname + '/.env') });
const express = require('express');
const app = express();
const path = require('path');

// Socket
const hostname = process.env.HOSTNAME || 'localhost';
const port = 3000;

// Controllers
const fetchUtil = require('./controllers/fetchUtil.ts');
const brands = require('./controllers/brands.ts');
const user = require('./controllers/user.ts');
const listing = require ('./controllers/listing.ts');
const orig_model = require('./controllers/orig_model.ts');
const { requireLogin, parseAuthorizationHeader } = require('./middleware/authorization');

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
    .use(parseAuthorizationHeader)

app
    .get('/api/v1', (req: Request, res: Response) => { res.send('Hello World') })
    .use('/api/v1/brands', brands)
    .use('/api/v1/fetch', fetchUtil)
    .use('/api/v1/user', user)
    .use('/api/v1/listing', listing)
    .use('/api/v1/orig_model', orig_model)

// Error handling middleware
app
    .use((err: any, req: Request, res: Response, next: NextFunction) => {
        console.error(err)
        const msg = {
            status: err.status || 500,
            error: err.message || 'Internal Server Error',
            isSuccess: false
        }
        res.status(msg.status).json(msg)
    })


app.listen(port, () => console.log(`Server running at http://${hostname}:${port}/`))

// Note: At the beginning of the project "server" was used but when express got implemented now its "app"