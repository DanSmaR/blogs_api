const { Op } = require('sequelize');
const { BlogPost, PostCategory, Category, User, sequelize } = require('../models');
const { postSchema, updatePostSchema } = require('./validations/schemas');
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

const validateUpdatePost = (data) => {
  const { error, value } = updatePostSchema.validate(data);
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

  return true;
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

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, getPostOptions);
  if (!post) throw createCustomError('Post does not exist', 404);
  return post;
};

const updatePost = async (data, id, userId) => {
  const { title, content } = data;
  const [affectedRows] = await BlogPost.update({ title, content, updated: new Date() },
    { where: { id, userId } });
  if (affectedRows < 1) throw createCustomError('Unauthorized user', 401);
  return true;
};

const deletePost = async (id, userId) => {
  const deletedRows = await BlogPost.destroy({ where: { id, userId } });
  if (deletedRows < 1) throw createCustomError('Unauthorized user', 401);
  return true;
};

module.exports = {
  validatePostData,
  validateUpdatePost,
  verifyCategory,
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
