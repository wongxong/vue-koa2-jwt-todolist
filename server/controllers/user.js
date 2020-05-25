const { compareSync } = require('bcrypt');
const { JWT_SECRET } = require('../config/secret');
const { sign } = require('jsonwebtoken');
const { getUserByName } = require('../models/user');
const { User } = require('../db');

const index = async (ctx, next) => {

};

const sign_in = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  console.log(name, password);
  const user = await getUserByName(name);

  console.log('user => ', user);

  if(user) {
    if(compareSync(password, user.password)) {
      const token = sign({
        name,
        id: user.id
      }, JWT_SECRET, {
        expiresIn: '1h'
      });
      ctx.json({
        status: 200,
        message: '登录成功',
        data: {
          token,
          name,
          id: user.id
        }
      });
    } else {
      ctx.json({
        status: 401,
        message: '用户名或密码错误'
      });
    }
  } else {
    ctx.json({
      status: 403,
      message: '用户不存在'
    });
  }
};

const show = async (ctx, next) => {

};

const create = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  console.log(name, password);
  const user = await User.create({
    name,
    password
  });

  if(user) {
    ctx.json({
      status: 200,
      message: '创建用户成功',
      data: user
    });
  } else {
    ctx.json({
      status: 500,
      message: 'error'
    });
  }
};

const update = async (ctx, next) => {

};

const destroy = async (ctx, next) => {

};

module.exports = {
  'GET /users': index,
  'GET /users/:id': show,
  'POST /users/sign_in': sign_in,
  'POST /users/create': create,
  'PATCH /users/:id': update,
  'PUT /users/:id': update,
  'DELETE /users/:id': destroy
};