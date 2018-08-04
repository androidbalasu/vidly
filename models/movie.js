const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

//1 Connect to the database
//2 Create a schema for the documents.
//3 Create a model.


const MovieSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    genre :{
        type: genreSchema,
        required: true
    }
  });
  
  const Movie = mongoose.model('Movie', MovieSchema);

  function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(3).max(50).required(),
        numberInStock: Joi.number().min(0).reqired(),
        dailyRentalRate: Joi.number().min(0).required(),
        genreId: Joi.string().min(3).max(50).required()

    };
    return Joi.validate(genre, schema);
    }

exports.Movie = Movie;
exports.validate = validateGenre;