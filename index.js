const express = require('express');
const app = express();
require('./startup/routes')(app);
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


//1 Connect to the database
//2 Create a schema for the documents.
//3 Create a model. 
require('./startup/logging')();
require('./startup/db')();
require('./startup/config')();

const p = Promise.reject(new Error('Something failed miserably!'));
p.then(()=> console.log('Done'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));