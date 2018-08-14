const mongoose  = require('mongoose');
const winston   = require('winston');  //Used for logging.

module.exports = function (){
    mongoose.connect('mongodb://localhost/vidly')
        .then(()=> winston.info('Connected to vidly database...'));
}