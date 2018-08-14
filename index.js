const express = require('express');
const app = express();
const winston   = require('winston');  //Used for logging.
require('./startup/routes')(app);

//1 Connect to the database
//2 Create a schema for the documents.
//3 Create a model. 
require('./startup/logging')();
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));