const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  const data = categoryService.validateCategoryData(req.body);
  const newCategory = await categoryService.createCategory(data);
  return res.status(201).json(newCategory);
};

const getCategories = async (_req, res) => {
  const categories = await categoryService.getCategories();
  return res.status(200).json(categories);
};

module.exports = {
  createCategory,
  getCategories,
};
