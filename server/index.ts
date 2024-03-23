// Importing from express the request and response types
import { Request, Response, NextFunction } from 'express';

// Modules
require('dotenv').config({ path: (__dirname + '/.env') });
const express = require('express');
const app = express();
const path = require('path');
const apiName = '/api/v1';

// Socket
const hostname = process.env.HOSTNAME || 'localhost';
const port = 3000;

// Controllers
const open_fetchUtil = require('./controllers/open/fetchUtil.ts');
const open_user = require('./controllers/open/user.ts');
const open_listing = require ('./controllers/open/listing.ts');
const secure_listing = require('./controllers/secure/listing.ts');
const open_store = require('./controllers/open/store.ts');
const { requireLogin, parseAuthorizationHeader } = require('./middleware/authorization');
const { fileUpload } = require('./middleware/fileUpload');

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
    .get(apiName, (req: Request, res: Response) => { res.send('Hello World') })
    .use(apiName + '/fetch', open_fetchUtil)
    .use(apiName + '/user', open_user)
    .use(apiName + '/listing', fileUpload(), open_listing)
    .use(apiName + '/secure_listing', requireLogin(), secure_listing)
    .use(apiName + '/store', open_store)


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