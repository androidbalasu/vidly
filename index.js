const Joi = require('joi');
const winston = require('winston');  //Used for logging.
require('winston-mongodb');  //Used for logging to mongodb.
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');
const error = require('./middleware/error');
require('express-async-errors');


//1 Connect to the database
//2 Create a schema for the documents.
//3 Create a model.

winston.add(winston.transports.File, {filename: 'logfile.log'});
winston.add(winston.transports.MongoDB, {db: 'mongodb://localhost/vidly'});

process.on('uncaughtException', (exception)=>{
        winston.error(exception.message, exception);
        process.exit(1);
});

//throw new Error('Something failed during startup');
winston.handleExceptions(
        new winston.transports.File({filename: 'uncaughtexceptions.log'}))

process.on('unhandledRejection', (exception)=>{
        winston.error(exception.message, exception);
        process.exit(1);
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


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));