import * as Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  thumbnail: Joi.string().required(),
  description: Joi.string().required(),
}).options({ convert: false });

export const updateProductSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number(),
  category: Joi.string(),
  thumbnail: Joi.string(),
  description: Joi.string(),
}).options({ convert: false });
