const { verify } = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/secret');
const JWT_UNLESS_PATH = require('./jwt-unless-path');

const stratergy = {
  401: ctx => {
    ctx.json({
      status: 401,
      message: 'invalid token.'
    });
  },
  500: ctx => {
    ctx.json({
      status: 500,
      message: 'internal server error.'
    });
  }
};

/**
 * 判断 token 是否可用
 */
module.exports = function() {
  return async (ctx, next) => {
    try {
      await next();
    } catch(err) {
      if(stratergy[err.status]) {
        stratergy[err.status](ctx);
      }
    }
  };
};