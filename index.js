const Joi = require('joi');
const winston = require('winston');  //Used for logging.
require('winston-mongodb');  //Used for logging to mongodb.
const express = require('express');
const app = express();
require('./startup/routes')(app);
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');

require('express-async-errors');

//1 Connect to the database
//2 Create a schema for the documents.
//3 Create a model.

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

mongoose.connect('mongodb://localhost/vidly')
        .then(()=> console.log('Connected to vidly database...'))
        .catch(error => console.log(error.message));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));