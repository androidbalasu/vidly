const Joi = require('joi');
const mongoose = require('mongoose');

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

function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(3).required(),
      phone: Joi.string().min(10).required(),
      isGold: Joi.boolean()
    };
  
    return Joi.validate(customer, schema);
  }

  exports.Customer = Customer;
  exports.validate = validateCustomer;