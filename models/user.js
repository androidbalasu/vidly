const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require ('jsonwebtoken');
const config = require ('config');

//1 Connect to the database
//2 Create a schema for the documents.
//3 Create a model.


const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
      },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
      type: Boolean
    }
  });

  //Use regular function syntanx and not arrow functions.
  UserSchema.methods.generateAuthToken = function (){   
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
  }
  
  const User = mongoose.model('User', UserSchema);

  function validateUser(user) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(user, schema);
  }

exports.User = User;
exports.validate = validateUser;
//exports.genreSchema = GenreSchema;