module.exports = (sequelize, DataTypes) => sequelize.define('User', {
  id: DataTypes.INTEGER,
  displayName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  image: DataTypes.STRING,
}, {
  underscored: true,
  timestamps: false,
});
