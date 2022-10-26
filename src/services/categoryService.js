const { categorySchema } = require('./validations/schemas');
const { Category } = require('../models');
const { createCustomError } = require('../errors/customError');

const validateCategoryData = (data) => {
  const { error, value } = categorySchema.validate(data);
  if (error) throw createCustomError(error.message, 400);
  return value;
};

const createCategory = async (data) => {
  const { name } = data;
  const newCategory = await Category.create({ name });
  console.log(newCategory);
  return newCategory;
};

module.exports = {
  createCategory,
  validateCategoryData,
};
