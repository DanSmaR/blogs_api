module.exports = (sequelize, DataTypes) => sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: DataTypes.STRING,
}, {
  underscored: true,
  timestamsps: false,
})