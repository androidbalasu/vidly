const winston = require('winston');  //Used for logging.
require('winston-mongodb');  //Used for logging to mongodb.
require('express-async-errors');

module.exports = function (){
    winston.add(winston.transports.File, {filename: 'logfile.log'});
    winston.add(winston.transports.MongoDB, {db: 'mongodb://localhost/vidly'});

    //throw new Error('Something failed during startup');
    winston.handleExceptions(
            new winston.transports.File({filename: 'uncaughtexceptions.log'}))

    process.on('unhandledRejection', (exception)=>{
            throw exception;
});
}