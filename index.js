const Joi = require('joi');
const winston = require('winston');  //Used for logging.
require('winston-mongodb');  //Used for logging to mongodb.
const express = require('express');
const app = express();
require('./startup/routes')(app);
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');

require('express-async-errors');

//1 Connect to the database
//2 Create a schema for the documents.
//3 Create a model.
require('./startup/db')();

winston.add(winston.transports.File, {filename: 'logfile.log'});
winston.add(winston.transports.MongoDB, {db: 'mongodb://localhost/vidly'});

//throw new Error('Something failed during startup');
winston.handleExceptions(
        new winston.transports.File({filename: 'uncaughtexceptions.log'}))

process.on('unhandledRejection', (exception)=>{
        throw exception;
});

const p = Promise.reject(new Error('Something failed miserably!'));
p.then(()=> console.log('Done'));

if (!config.get('jwtPrivateKey')){
        console.error('FATAL ERROR: jwtPrivateKey is not defined');
        process.exit(1);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));