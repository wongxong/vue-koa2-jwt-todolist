const { TodoList } = require('../db');

module.exports = {
  getTodoList: id => {
    return TodoList.findOne({
      where: {
        id
      }
    });
  }
};