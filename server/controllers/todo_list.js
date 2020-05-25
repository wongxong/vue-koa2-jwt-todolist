const { TodoList } = require('../db');
const { getTodoList } = require('../models/todo_list');

const index = async (ctx, next) => {
  const { user_id } = ctx.request.query;
  const todo_lists = await TodoList.findAndCountAll({
    where: {
      user_id
    },
    order: [
      [ 'updated_at', 'desc' ]
    ]
  });

  if(todo_lists) {
    ctx.json({
      status: 200,
      message: '',
      data: todo_lists
    });
  } else {

  }
};

const show = async (ctx, next) => {

};

const create = async (ctx, next) => {
  const { user_id, text } = ctx.request.body;
  const todo_list = await TodoList.create({
    text,
    user_id
  });

  if(todo_list) {
    ctx.json({
      status: 200,
      message: '创建成功',
      data: todo_list
    });
  } else {
    ctx.json({
      status: 400,
      message: '创建失败'
    });
  }
};

const update = async (ctx, next) => {
  const { id } = ctx.params;
  const { status } = ctx.request.body;

  console.log(status)

  let todo_list = await getTodoList(id);

  if(todo_list) {
    todo_list = await todo_list.update({
      status
    });
    ctx.json({
      status: 200,
      message: '任务状态更新成功',
      data: todo_list
    });
  } else {
    ctx.json({
      status: 404,
      message: '任务不存在'
    });
  }
};

const destroy = async (ctx, next) => {
  const { id } = ctx.params;
  const todo_list = await getTodoList(id);

  if(todo_list) {
    await todo_list.destroy();
    ctx.json({
      status: 200,
      message: '任务删除成功',
      data: todo_list
    });
  } else {
    ctx.json({
      status: 404,
      message: '任务不存在'
    });
  }
};

module.exports = {
  'GET /todo_lists': index,
  'GET /todo_lists/:id': show,
  'POST /todo_lists/create': create,
  'PATCH /todo_lists/:id': update,
  'PUT /todo_lists/:id': update,
  'DELETE /todo_lists/:id': destroy
};