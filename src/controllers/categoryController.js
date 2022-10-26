const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  const data = categoryService.validateCategoryData(req.body);
  const newCategory = await categoryService.createCategory(data);
  return res.status(201).json(newCategory);
};

module.exports = {
  createCategory,
};
