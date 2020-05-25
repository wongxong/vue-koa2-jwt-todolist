const Koa = require('koa');
const router = require('./router');
const jwt = require('koa-jwt');
const { JWT_SECRET } = require('./config/secret');
const JWT_TOKEN = require('./middleware/jwt-token');
const JWT_UNLESS_PATH = require('./middleware/jwt-unless-path');
const bodyparser = require('koa-bodyparser');
const proxy = require('http-proxy-middleware');
const app = new Koa();
const proxyOptions = {
  target: ''
};

app.use(async (ctx, next) => {
  console.log(`Process ${ ctx.request.method }: ${ ctx.request.url }`);

  const startTime = Date.now();

  ctx.json = ({ status, message, data }) => {
    ctx.set('Content-Type', 'application/json;charset=utf-8');
    ctx.status = status;
    ctx.body = {
      code: status,
      message,
      data
    };
  };

  await next();

  const endTime = Date.now();

  ctx.set('X-Response-Time', endTime - startTime + 'ms');
});

// 解析 jwt_token
// app.use(JWT_TOKEN());

app.use(bodyparser());

app.use(jwt({ secret: JWT_SECRET }).unless({
  path: JWT_UNLESS_PATH
}));
app.use(router.routes());

// app.use(async (ctx, next) => {
//   await next();
//   ctx.response.type = 'text/html';
//   ctx.response.body = '<h1>hello koa2</h1>';
// });

app.listen(9001, () => {
  console.log(`- Local: http://localhost:9001/`);
});