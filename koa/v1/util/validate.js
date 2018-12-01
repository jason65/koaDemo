const tokenConf = require('../conf/tokenKey')
const jwt = require('jsonwebtoken')
Token = {
  verify: (token) => {
    if (token) {
      try {
        let result = jwt.verify(token, tokenConf.secret);
        return result;
      } catch (err) {
        //票据验证失败,需要提示需要重新登录
        return "fail";
      }
    }
    return "fail";
  }
}
module.exports = Token