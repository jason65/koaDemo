<template>
  <div id='leftMenu'>
    <el-menu :default-active="expanded" class="el-menu-vertical-demo" id="kleft" @open="handleOpen" @close="handleClose">
      <div v-for="item in menuList" :key="item.ID">
        <!--如果只是一级菜单-begins-->
        <el-menu-item :index="item.ID" v-if="item.children===undefined"><i class="el-icon-menu">{{item.ROUTER_NAME}}</i></el-menu-item>
        <!--如果只是一级菜单-ends-->
        <!--如果只是二级菜单-begins-->
        <el-submenu :index="item.ID" v-if="item.children&&item.children.length>0">
          <template slot="title"><i class="el-icon-message"></i>{{item.ROUTER_NAME}}</template>
          <div v-for="itemChild in item.children" :key="itemChild.ID">
            <el-menu-item :index="itemChild.ID" v-if="itemChild.children===undefined">{{itemChild.ROUTER_NAME}}</el-menu-item>
            <!--如果只是三级菜单-begins-->
            <el-submenu :index="itemChild.ID" v-if="itemChild.children&&itemChild.children.length>0">
              <template slot="title"><i class="el-icon-message"></i>{{itemChild.ROUTER_NAME}}</template>
              <el-menu-item v-for="itemChilidChild in itemChild" :key="itemChilidChild.ID" :index="itemChilidChild.ID">{{itemChilidChild.ROUTER_NAME}}</el-menu-item>
              <!--如果只是三级菜单-ends-->
            </el-submenu>
          </div>
        </el-submenu>
        <!--如果只是二级菜单-ends-->
      </div>
    </el-menu>
  </div>
</template>

<script>
  export default {
    props: {
      menuList: Array,
      defaultExpanded: String
    },
    data() {
      return {
        expanded: ''
      }
    },
    mounted() {
      let innerHeight = window.document.body.clientHeight - 66
      document.querySelector('#kleft').style.height = innerHeight + 'px'
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      }
    },
    watch: {
      menuList: function (val, oldVal) {
        if (val.length > 0) {
          setTimeout(() => {
            this.expanded = this.defaultExpanded
          }, 0)
        }
      }
    }
  }

</script>
<style scoped>
  #leftMenu {
    width: 200px;
    float: left;
    margin-top: 6px;
  }

  .el-menu-vertical-demo {
    height: 100%;
  }

</style>
