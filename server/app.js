require('dotenv').config();
const path = require('path');
require('module-alias').addAlias('@', path.join(__dirname, 'src'));
const customerRouter = require('@/modules/catalogs/customers/routes');
const userRouter = require('@/modules/catalogs/users/routes');
const authRouter = require('@/modules/auth/routes');
const sequelize = require('@/core/dbConnection');
const bodyParser = require('body-parser');
const dbSync = require('@/core/dbSync');
const jwt = require("jsonwebtoken");
const express = require('express');
const cors = require('cors')
const app = express();

const corsOptions = {
    origin: process.env.ALLOW_ORIGIN,
    methods: ['OPTIONS, GET, POST, PUT, PATCH, DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token', 'x-api-key', 'device_uuid', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials'],
    credentials: true,
}

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    console.log('---Incoming request:');
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('---');
    next();
});

app.use('/customer', customerRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);

//app.use(express.urlencoded());
//app.use(express.multipart());

console.log('Initializing server ...');
sequelize.authenticate()
    .then(async () => {
        await dbSync();
        // require('./database/init/navigationInit')();
        console.log('Connection to database has been established successfully.');
    })
    .catch((err) => console.error('Unable to connect to the database:', err));

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server works on http://localhost:${process.env.SERVER_PORT}`);
});