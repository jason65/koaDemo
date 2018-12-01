<template>
  <div id='id'>
    <el-row style="background-color:#eef1f6;">
      <el-col :span="4" style="text-align:left;padding-left:8px; vertical-align:middle;">
        <router-link to="/home"> <img src="../../assets/logo.png" width="20%" class="logo" :alt="sysName" :title="sysName" /></router-link>
        <span class="sysTitle">{{sysName}}</span>
      </el-col>
      <el-col :span="16">
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item v-for="item in menuLevel1" :key="item.ID" :index="item.ID"><i :class="item.ICON_FONT"></i> {{item.NAME}}
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4" style="text-align:right;">
        <el-dropdown>
          <span class="el-dropdown-link setting ">
        {{userInfo}}<i class="el-icon-setting" style="margin-right:18px;margin-left: 24px;"></i>
      </span>
          <el-dropdown-menu slot="dropdown" style="background-color: transparent;border:0;color:#413E3E;font-size:14px;">
            <el-dropdown-item>
              <el-col @click.native="changePassword" :span="24" style="text-align:right" title="修改密码">
                <i class="el-icon-document"></i>&nbsp;&nbsp;&nbsp;修改密码
              </el-col>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-col @click.native="resetPassword" :span="24" style="text-align:right" title="重置密码">
                <i class="el-icon-document"></i>&nbsp;&nbsp;&nbsp;重置密码
              </el-col>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-col @click.native="logout" :span="24" style="text-align:right" title="安全退出">
                <i class="el-icon-document"></i>&nbsp;&nbsp;&nbsp;安全退出
              </el-col>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'layout-header',
    data() {
      return {
        sysName: k.config.sys.CN_NAME,
        userInfo: k.util.cache.get(k.config.user.INFO, 'session').LOGIN_NAME,
        // 当前菜单的ID
        activeIndex2: '',
        // 当前菜单ID所含的子菜单
        activeChildMenu: '',
        // 当前菜单的数组
        menuLevel1: []
      }
    },
    created() {
      if (k.config.sys.SHOW_ROOT_MENU) {
        // 如果在header部分显示等级菜单
        this.menuLevel1 = k.util.cache.get('MENUTREE', 'session')[0].children
        // this.activeIndex2
        this.menuLevel1.map(item => {
          if (item.ROUTER_NAME === this.$route.fullPath.split('/')[2]) {
            this.activeIndex2 = item.ID
            this.activeChildMenu = item.children
          }
        })
      } else {
        // 如果不显示就需要根据路由来确定菜单
        let menuList = k.util.cache.get('MENUTREE', 'session')[0].children
        menuList.map(item => {
          if (item.ROUTER_NAME === this.$route.fullPath.split('/')[2]) {
            this.menuLevel1 = item.children
            this.activeIndex2 = item.children[0].ID
            this.activeChildMenu = item.children[0].children
          }
        })
      }
      this.$emit('currentPart', this.activeChildMenu)
    },
    methods: {
      /*
        当前选中其中的一个菜单项目的时候，主要做两件事情：
        1：获取当菜单的子菜单，并触发currentPart的事件
        2：获取当前菜单的的第一个子菜单 的子菜单……的子菜单的路由，并完成路由的跳转
      */
      handleSelect(curIndex) {
        // currentItem ，改变量主要用于存储当前选中的菜单，也就是layout的header部分菜单，
        let currentItem = null
        this.menuLevel1.map(item => {
          if (item.ID === curIndex) {
            currentItem = item
            this.activeChildMenu = item.children
          }
        })
        this.$emit('currentPart', this.activeChildMenu)
        this.$rouer.push('/layout/' + this.getFirstMenu(currentItem))
      },
      /*
      获取当前菜单的最底层的英文名称的路径,Router_Path是页面的物理路径
      eg: let zz=[{1,children:[{ROUTER_PATH:xx/yy/zz}]},{2}],传入的menu值为zz的时候，返回的是yy/zz
      */
      getFirstMenu(menus) {
        let self = this
        if (menus.children) {
          for (let index = 0; index < 1; index++) {
            let element = menus.children[index]
            if (element.children) {
              return self.getFirstMenu(element)
            } else {
              return element['ROUTER_PATH'].substr(element['ROUTER_PATH'].indexOf('/') + 1)
            }
          }
        }
      },
      // 更改密码
      changePassword() {

      },
      // 重置密码
      resetPassword() {},
      // 退出登陆
      logout() {
        k.root.logout()
      }
    }
  }

</script>

<style scoped>
  .setting {
    display: inline-block;
    line-height: 56px;
  }

  .logo {
    margin-top: 10px;
    margin-left: 30px;
    margin-right: 18px;
  }

  .sysTitle {
    display: inline-block;
    position: relative;
    top: -19px;
  }

</style>
