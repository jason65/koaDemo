const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const convert = require('koa-convert');
const index = require('./routes/index');
const users = require('./routes/users');
const upms = require('./routes/upms');
// const jwt = require('koa-jwt');
// app.use(function (ctx, next) {
//   if (ctx.url.match(/^\/upms\/role\/login_check/)) {
//     ctx.body = 'unprotected\n';
//   } else {
//     return next();
//   }
// });

// app.use(jwt({
//   secret: 'hello@2016'
// }));
// error handler
onerror(app);
const cors = require('koa-cors');
// 跨域问题
app.use(convert(cors()));
// middlewares
//设置跨域访问
app.use(bodyparser);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'pug'
}));

// logger
app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
// app.use(convert(function* (next) {
//   const start = new Date();
//   yield next;
//   const ms = new Date() - start;
//   console.log(`${this.method} ${this.url} - ${ms}ms`);
// }));

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(upms.routes(), upms.allowedMethods());
module.exports = app;