<template>
  <div id='id'>
    <layout-header @currentPart="currentPart"></layout-header>
    <layout-contain :menu-list="menuList" :default-expanded="defaultExpanded"></layout-contain>
    <div class="layoutCon">
      <span :class="{'el-icon-d-arrow-left':hideLeft,'el-icon-d-arrow-right':showLeft}"></span>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in "></el-breadcrumb-item>
      </el-breadcrumb>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import layoutHeader from './header.vue'
  import contain from './contain.vue'
  export default {
    name: 'layout-index',
    data() {
      return {
        // 传递给左边菜单的数组,是系统下的子菜单,默认是数组
        menuList: [],
        // 隐藏左边的图标，hideLeft,默认情况下是隐藏，showLeft默认清空下是显示；这两个变量永远是一个是false,一个是true;
        hideLeft: true,
        showLeft: false,
        // 默认展开的左边菜单节点的ID属性
        defaultExpanded: '',
        // 当前路由所在的路径，主要用于面包屑的部分
        pathDes: []
      }
    },
    mounted() {},
    components: {
      'layout-header': layoutHeader,
      'layout-contain': contain
    },
    methods: {
      /*
      将头部变化的menu值和该menu值,最底层（该层没有children),的ID值获取，并且传递给左边的菜单
       params:menu是点击菜单的全部的children部分
      */
      currentPart(menu) {
        let self = this
        if (menu.length > 0) {
          if (menu[0].children && menu[0].children.length > 0) {
            // 如果第一个菜单存在children,且length>0
            if (menu[0].children[0].children && menu[0].children[0].children.length > 0) {
              // 如果是3级菜单
              self.defaultExpanded = menu[0].children[0].children[0].ID
            } else {
              self.defaultExpanded = menu[0].children[0].ID
            }
          } else {
            // 如果是一级菜单
            self.defaultExpanded = menu[0].ID
          }
          self.menuList = menu
        }
      }
    }
  }

</script>

<style scoped>
  .layoutCon {
    float: left;
  }

</style>
