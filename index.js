const Joi = require('joi');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//1 Connect to the database
//2 Create a schema for the documents.
//3 Create a model.

mongoose.connect('mongodb://localhost/vidly')
        .then(()=> console.log('Connected to vidly database...'))
        .catch(error => console.log(error.message));


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));