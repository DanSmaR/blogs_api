const { BlogPost, PostCategory, sequelize } = require('../models');
const { postSchema } = require('./validations/schemas');
const { createCustomError } = require('../errors/customError');

const validatePostData = (data) => {
  const { error, value } = postSchema.validate(data);
  if (error) throw createCustomError(error.message, 400);
  return value;
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

module.exports = {
  validatePostData,
  createPost,
};
