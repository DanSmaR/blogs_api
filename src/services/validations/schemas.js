const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).messages({
  'string.empty': 'Some required fields are missing',
});

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().allow(''),
});

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number().integer().required()).required(),
}).messages({
  'string.empty': 'Some required fields are missing',
  'array.includesRequiredUnknowns': 'Some required fields are missing',
});

const updatePostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
}).messages({
  'string.empty': 'Some required fields are missing',
});

module.exports = {
  loginSchema,
  userSchema,
  categorySchema,
  postSchema,
  updatePostSchema,
};
