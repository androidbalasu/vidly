const Joi = require('joi');
const mongoose = require('mongoose');

//1 Connect to the database
//2 Create a schema for the documents.
//3 Create a model.


const GenreSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    }
  });
  
  const Genre = mongoose.model('Genre', GenreSchema);

  function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(genre, schema);
  }

exports.Genre = Genre;
exports.validate = validateGenre;