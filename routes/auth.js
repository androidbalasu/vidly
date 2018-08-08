const Joi = require('joi');
const express = require('express');
const {User} = require ('../models/user');
const mongoose = require('mongoose');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const config = require('config');


router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email: req.body.email});  //Find an object by its property.
  if(!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();
  res.send(token);
  
});

function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(req, schema);
  }

module.exports = router;