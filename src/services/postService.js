const { Op } = require('sequelize');
const { BlogPost, PostCategory, Category, User, sequelize } = require('../models');
const { postSchema } = require('./validations/schemas');
const { createCustomError } = require('../errors/customError');

const getPostOptions = {
  include: [
    {
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    },
  ],
};

const validatePostData = (data) => {
  const { error, value } = postSchema.validate(data);
  if (error) throw createCustomError(error.message, 400);
  return value;
};

const verifyCategory = async ({ categoryIds }) => {
  const { count } = await Category.findAndCountAll({
    where: {
      id: {
        [Op.in]: categoryIds,
      },
    },
  });

  if (categoryIds.length !== count) {
    throw createCustomError('one or more "categoryIds" not found', 400);
  }

  return null;
};

const createPost = async (data, userId) => {
  const { title, content, categoryIds } = data;

  try {
    const result = await sequelize.transaction(async (t) => {
      const newPost = await BlogPost.create({ title, content, userId }, { transaction: t });
      await Promise.all(categoryIds.map((id) => PostCategory
        .create({ postId: newPost.id, categoryId: id }, { transaction: t })));
      return newPost;
    });
    return result;
  } catch (err) {
    console.error(err.stack);
    throw err;
  }
};

const getPosts = () => BlogPost.findAll(getPostOptions);

const getPostById = (id) => BlogPost.findByPk(id, getPostOptions);

module.exports = {
  validatePostData,
  verifyCategory,
  createPost,
  getPosts,
  getPostById,
};
