/* jshint indent: 2 */
const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      set(val) {
        val = bcrypt.hashSync(val, 10);
        this.setDataValue('password', val);
      }
    }
  }, {
    tableName: 'users'
  });
};
