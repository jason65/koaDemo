const {
  query
} = require('../dao/operate');
const jwt = require('jsonwebtoken')
const token = require('../conf/tokenKey')
const tokenOerate = require('../util/validate')
const koaJwt = require('koa-jwt');
// 登陆方法执行sql
async function login(param) {
  if (JSON.stringify(param) !== '{}') {
    let sql = "SELECT * FROM `view_role_user` where LOGIN_NAME='" + param.LOGIN_NAME + "' and PASSWORD='" + new Buffer(param.PASSWORD, 'base64').toString() + "' and DEL_FLAG = 0"
    let dataList = await query(sql)
    return dataList
  }
}
//用户菜单执行sql
async function getMenu(sql) {
  let dataList = await query(sql)
  return dataList
}
//登陆返回
exports.loginAction = async(ctx, next) => {
  let param = ctx.request.body
  let dataList = await login(param)
  let res = {}
  if (dataList.length !== 0) {
    let tokeninfo = jwt.sign(dataList[0], token.secret);
    res = {
      code: '200',
      message: 'success',
      data: {
        userInfo: dataList[0],
        token: tokeninfo
      }
    }
  } else {
    res = {
      code: '201',
      message: '用户名或者密码错误',
      data: {}
    }
  }
  ctx.body = res
}

//获取用户菜单
exports.getMenuAction = async(ctx, next) => {
  // console.log(ctx.request.header.token)
  let decode = tokenOerate.verify(ctx.request.header.token)
  if (decode !== 'fail') {
    let sql = ''
    if (decode.NAME = 'kindo') {
      sql = "SELECT `ID`,`PARENT_ID`,`NAME`,`ENNAME`,`ROUTER_NAME`,`ROUTER_PATH`,`SORT`,`ICON_FONT`,`IS_IFRAME`,`IS_SHOW`,`REMARK` FROM `q_menu` WHERE ( `DEL_FLAG` = 0 )";
    } else {
      sql = "SELECT a.* FROM Q_MENU a INNER JOIN q_role_menu b ON a.id = b.MENU_ID INNER JOIN q_role c ON c.id = b.ROLE_ID INNER JOIN q_role_user d ON c.id = d.ROLE_ID WHERE d.USER_ID ='" + decode.ID + "'"
    }
    let dataList = await getMenu(sql)
    ctx.body = {
      code: '200',
      message: 'succcess',
      data: dataList
    }
  } else {
    ctx.body = {
      code: '200',
      message: 'succcess',
      data: {}
    }
  }
}