<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import loadingBar from 'iview/src/components/loading-bar'
  export default {
    name: 'app',
    created() {
      k.root = this
      if (!k.util.cache.get(k.config.user.TOKEN)) {
        this.$router.push('/')
      } else {
        if (this.$route.fullPath === '/') {
          // 如果是在登陆界面成功后的刷新
          if (k.config.sys.SHOW_HOME) {
            // 如果需要显示home界面
            this.sendAjax('/home')
          } else {
            // 如果不需要显示home界面
            this.sendAjax('/layout')
          }
        } else if (this.$route.fullPath.split('/')[1] === 'layout') {
          // 如果是在layout页面的刷新
          this.sendAjax()
        }
      }
    },
    mounted() {},
    methods: {
      // 进度条的开始
      start() {
        loadingBar.start()
      },
      // 进度条的结束
      finish() {
        loadingBar.finish()
      },
      // 进度条的报错
      error() {
        loadingBar.error()
      },
      alert(msg, type = 'success', duration = 3000) {
        k.root.$message({
          message: msg,
          type: type,
          duration: duration
        })
      },
      notify(title = '', msg, type = 'success', duration = 4500) {
        k.root.$notify({
          title: title,
          message: msg,
          type: type,
          duration: duration
        })
      },
      // 退出的方法
      logout() {
        Object.values(k.config.user).map(item => {
          k.util.cache.remove(item, 'session')
        })
        this.$router.push('/')
      },
      // 发送请求
      sendAjax(url) {
        this.ajax.get('http://127.0.0.1:3000/upms/role/get_role_menu').then(res => {
          let rootMenu = res.data.sort((a, b) => {
            return parseInt(a.SORT) - parseInt(b.SORT)
          })
          let rootMenuTree = k.util.util.toTree(rootMenu, 'ID', 'PARENT_ID')
          // 保存用户菜单 session-含顶级菜单为 ' kindo 统一平台 '
          k.util.cache.set(k.config.user.MENUTREE, rootMenuTree, 'session')
          if (url === '/home') {
            // 从登陆界面跳到home界面
            this.$router.push(url)
          } else if (url === '/layout') {
            // 从登陆界面跳转到layout界面
            let menutree = rootMenuTree[0].children
            // 因为最多是3层目录
            let url = '/layout/' + menutree[0].ROUTER_NAME + '/' + menutree[0].children[0].ROUTER_NAME
            this.$router.push(url)
          }
          this.addRouter(res.data)
        })
      },
      // 添加路由
      addRouter() {
        const router = this.getRouter(k.util.cache.get(k.config.user.MENUTREE, 'session')[0].children)
        this.$router.addRoutes(router)
      },
      // 获取全部路由
      getRouter(roleMenuTree) {
        let routers = []
        // 顶级路由
        let getRouterRoot = (menus) => {
          menus.forEach(menu => {
            routers.push({
              meta: {
                path: menu.ROUTER_NAME
              },
              name: menu.ID,
              path: '/layout/:id',
              component: resolve => require([`@/components/layout/index.vue`], resolve),
              children: getRouterChildren(menu.children, [])
            })
          })
        }
        // 子级路由
        let getRouterChildren = (menus) => {
          let routerChildren = []
          let getChildren = (menus) => {
            if (menus && menus.length > 0) {
              menus.forEach(menu => {
                if (menu.children && menu.children.length > 0) {
                  getChildren(menu.children)
                } else {
                  routerChildren.push({
                    meta: {
                      path: menu.ROUTER_PATH
                    },
                    name: `${menu.ID}`,
                    path: `${menu.ROUTER_PATH.split('/')[2]}`,
                    component: resolve => require([`@/${menu.ROUTER_PATH}/index.vue`], resolve, (r) => {
                      k.root.alert('组件加载出错, 请联系管理员', 'warning')
                      return require('@/components/notFound/index.vue')
                    })
                  })
                }
              })
            }
          }
          getChildren(menus)
          return routerChildren
        }
        getRouterRoot(roleMenuTree)
        // router.push({
        //   name: 'noAuthority',
        //   path: '/noAuthority',
        //   component: resolve => require([`@/components/noAuthority.vue`], resolve)
        // })

        // router.push({
        //   name: 'changeLog',
        //   path: '/changeLog',
        //   component: resolve => require([`@/changeLog.vue`], resolve)
        // })

        // router.push({
        //   name: 'notFound',
        //   path: '*',
        //   component: resolve => require([`@/components/notFound.vue`], resolve)
        // })
        return routers
      }
    },
    watch: {
      $route: function (val, oldval) {
        if (val.fullPath.split('/')[1] === 'layout' && oldval.fullPath === '/home') {
          // 从home--layout的点击跳转
          this.sendAjax()
        } else if (val.fullPath === '/' && oldval.fullPath !== '/') {
          this.logout()
        }
      }
    }
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    /*margin-top: 60px;*/
  }

</style>
