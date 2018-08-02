const Joi = require('joi');
const express = require('express');

const mongoose = require('mongoose');
const router = express.Router();

//Create the shape of the documents.
const CustomerSchema = new mongoose.Schema(
    {
    name:   {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
            },
  isGold: Boolean,
  phone:    {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
            }
    }
);

const Customer = mongoose.model('Customer', CustomerSchema);

router.get('/', async (req, res) => {
  let customers = await Customer.find().sort('name');
  res.send(customers);
});

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });

  customer = await customer.save();
  res.send(customer);
});

router.put('/:id', async(req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  }, {new: true});
  
  if (!customer) return res.status(404).send('The genre with the given ID was not found.');
  
   res.send(customer);
});

router.delete('/:id', async (req, res) => {

  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send('The genre with the given ID was not found.');

  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send('The genre with the given ID was not found.');
  res.send(customer);
});

function validateGenre(customer) {
  const schema = {
    name: Joi.string().min(3).required(),
    phone: Joi.string().min(10).required(),
    isGold: Joi.boolean()
  };

  return Joi.validate(customer, schema);
}

module.exports = router;