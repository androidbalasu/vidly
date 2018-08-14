const Joi = require('joi');

const express = require('express');
const app = express();
require('./startup/routes')(app);
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');

//1 Connect to the database
//2 Create a schema for the documents.
//3 Create a model. 
require('./startup/logging')();
require('./startup/db')();

const p = Promise.reject(new Error('Something failed miserably!'));
p.then(()=> console.log('Done'));

if (!config.get('jwtPrivateKey')){
        console.error('FATAL ERROR: jwtPrivateKey is not defined');
        process.exit(1);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));