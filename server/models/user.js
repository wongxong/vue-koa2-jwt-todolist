const { User } = require('../db');

module.exports = {
  getUserById: id => {
    return User.findOne({
      where: {
        id
      }
    });
  },

  getUserByName: name => {
    return User.findOne({
      where: {
        name
      }
    });
  },

  createUser: data => {
    return User.create(data);
  }
}