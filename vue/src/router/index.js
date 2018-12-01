import Vue from 'vue'
import Router from 'vue-router'
import mockjs from 'mockjs'
Vue.use(Router)
let router = new Router({
  routes: [{
    path: '/',
    meta: {
      config: 'components/login'
    },
    component: resolve => require([`@/components/login/index.vue`], resolve)
  }, {
    path: '/home',
    component: resolve => require([`@/components/home/index.vue`], resolve)
  }]
})
router.beforeEach((to, from, next) => {
  if (to.meta.config) {
    let config = require('../' + to.meta.config + '/config/index.js')
    for (let key in config.default['api']) {
      if (JSON.stringify(config.default['mock'].key) !== '{}') {
        mockjs.mock(new RegExp(key + '.*'), config.default['mock'].key)
      }
    }
  }
  next()
})
export default router
