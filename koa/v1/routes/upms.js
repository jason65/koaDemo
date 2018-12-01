const router = require('koa-router')()
const login = require('../api/login')
router.prefix('/upms')

router.post('/', function (ctx, next) {
  ctx.body = 'this is a upms2 response!'
})

router.post('/role/login_check', login.loginAction)
router.get('/role/get_role_menu', login.getMenuAction)
module.exports = router