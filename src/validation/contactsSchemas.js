import Joi from 'joi';

export const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().min(3).max(20).required(),  
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('personal', 'work', 'other')
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  phoneNumber: Joi.string().min(3).max(20),  
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('personal', 'work', 'other')
}).min(1);


