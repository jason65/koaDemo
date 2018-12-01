<!--
 *      lilizhou
 *
 *      登陆以后的首页
 -->

<template>
  <div>
    <div class="home">
      <div class="platform-background">
        <el-row class="headerTop">
          <el-col :span="20" class="sysInfo">{{sysInfo}}</el-col>
          <el-col :span="4">
            <el-dropdown>
              <span class="el-dropdown-link headerTop">
        {{userInfo}}<i class="el-icon-setting" style="margin-left:8px;"></i>
      </span>
              <el-dropdown-menu slot="dropdown" style="background-color: transparent;border:0;color:#fff;font-size:14px;">
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
        <div class="index-page platform-container" :class="colSize">
          <ul id="platform-list">
            <!--一般为三级菜单, 因此使用 /layout/:二级菜单/三级菜单第一项-->
            <router-link :to="{ path: '/layout/'+ getFirstMenu(item) }" v-for="(item,index) in roleMenus" :key="item.ID">
              <li class="platform" :class="platform(index)">
                <div class="con"><i class="icon" :class="item.ICON_FONT"></i>
                  <span class="name">{{ item.NAME }}</span>
                </div>
              </li>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import config from './config'
  let self
  export default {
    data() {
      return {
        userInfo: k.util.cache.get(k.config.user.INFO, 'session').LOGIN_NAME,
        sysInfo: k.config.sys.CN_NAME,
        roleMenus: []
      }
    },
    computed: {
      colSize() {
        let key = 'col' + this.roleMenus.length
        return {
          [key]: true
        }
      }
    },
    created() {
      self = this
    },
    mounted() {
      this.$nextTick(function () {
        self.roleMenus = k.util.cache.get(k.config.user.MENUTREE, 'session')[0].children
      })
    },
    methods: {
      /**
       * 获取当前层级的第一个菜单的路由
       */
      getFirstMenu(menus) {
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
      platform(index) {
        let key = 'platform' + (parseInt(index) + 1)
        return {
          [key]: true
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
  .sysInfo {
    text-align: left;
    padding-left: 20px;
  }

  .headerTop {
    color: #fff;
    font-size: 20px;
    margin-top: 16px;
  }

  .home {
    width: 100%;
    height: 100%;
  }

  .k-icon {
    font-size: 70px
  }

  .fa {
    font-size: 70px;
  }

  .index-user-wrap .fa {
    font-size: 20px;
    color: #409ce3;
    margin-right: 5px;
    vertical-align: middle;
  }

  .fa-sign-out:hover {
    cursor: pointer;
  }

  .platform-background {
    background: url("../../assets/img/background.png") no-repeat;
    width: 100%;
    height: 100%;
    position: absolute;
    /*top: 0;*/
  }

  .platform-container {
    position: absolute;
    width: 70%;
    height: 80%;
    top: 9%;
    left: 15%;
  }

  .platform-container ul {
    height: 100%;
  }

  .platform {
    float: left;
    position: relative;
    color: #fff;
    cursor: pointer;
    list-style: none;
  }

  .platform:hover {
    color: #fff;
  }

  .platform .con {
    height: 60%;
    position: relative;
    top: 32%;
    text-align: center;
  }

  .platform1 {
    background-color: #0875c8;
  }

  .platform2 {
    background-color: #409ce3;
  }

  .platform3 {
    background-color: #2d9e0e;
  }

  .platform4 {
    background-color: #1e50a2;
  }

  .platform5 {
    background-color: #535aa7;
  }

  .platform6 {
    background-color: #006e9a;
  }

  .platform7 {
    background-color: #0a9ab8;
  }

  .platform8 {
    background-color: #2792c3;
  }

  .platform9 {
    background-color: #3e62ad;
  }

  .platform1:hover {
    background-color: #0cb0e4;
  }

  .platform2:hover {
    background-color: #60cef2;
  }

  .platform3:hover {
    background-color: #43cf15;
  }

  .platform4:hover {
    background-color: #579aff;
  }

  .platform5:hover {
    background-color: #97a1ff;
  }

  .platform6:hover {
    background-color: #00a5cd;
  }

  .platform7:hover {
    background-color: #0fcddc;
  }

  .platform8:hover {
    background-color: #3ac9e2;
  }

  .platform9:hover {
    background-color: #6595ff;
  }

  .col1 li {
    width: 30%;
    height: 30%;
    top: 32%;
    left: 35%;
  }

  .col2 li {
    width: 40%;
    height: 30%;
    top: 32%;
    margin: 0.5%;
    left: 8%;
  }

  .col3 .platform1,
  .col3 .platform2,
  .col3 .platform3 {
    width: 30%;
    height: 30%;
    top: 32%;
    margin: 0.5%;
    left: 0;
  }

  .col4 .platform1,
  .col4 .platform4 {
    width: 49%;
    height: 30%;
    top: 18%;
    margin: 0.5%;
    left: 10%;
  }

  .col4 .platform2,
  .col4 .platform3 {
    width: 24.5%;
    height: 30%;
    top: 18%;
    margin: 0.5%;
    left: 10%;
  }

  .col5 .platform1,
  .col5 .platform2,
  .col5 .platform4 {
    width: 47%;
    height: 30%;
    top: 18%;
    margin: 0.5%;
  }

  .col5 .platform3,
  .col5 .platform5 {
    width: 23%;
    height: 30%;
    top: 18%;
    margin: 0.5%;
  }

  .col6 .platform1,
  .col6 .platform5 {
    width: 47%;
    height: 30%;
    top: 18%;
    margin: 0.5%;
  }

  .col6 .platform2,
  .col6 .platform3,
  .col6 .platform4,
  .col6 .platform6 {
    width: 22.5%;
    height: 30%;
    top: 18%;
    margin: 0.5%;
  }

  .col7 .platform1,
  .col7 .platform2,
  .col7 .platform4,
  .col7 .platform6,
  .col7 .platform7 {
    width: 47%;
    height: 30%;
    top: 4%;
    margin: 0.5%;
  }

  .col7 .platform3,
  .col7 .platform5 {
    width: 23%;
    height: 30%;
    top: 4%;
    margin: 0.5%;
  }

  .col8 .platform1,
  .col8 .platform2,
  .col8 .platform4,
  .col8 .platform6 {
    width: 47%;
    height: 30%;
    top: 4%;
    margin: 0.5%;
  }

  .col8 .platform3,
  .col8 .platform5,
  .col8 .platform7,
  .col8 .platform8 {
    width: 23%;
    height: 30%;
    top: 4%;
    margin: 0.5%;
  }

  .col9 .platform1,
  .col9 .platform5,
  .col9 .platform8 {
    width: 47%;
    height: 30%;
    top: 4%;
    margin: 0.5%;
  }

  .col9 .platform2,
  .col9 .platform3,
  .col9 .platform4,
  .col9 .platform6,
  .col9 .platform7,
  .col9 .platform9 {
    width: 22.5%;
    height: 30%;
    top: 4%;
    margin: 0.5%;
  }

  .icon {
    font-size: 63px;
  }

  .name {
    position: absolute;
    width: 100%;
    height: 20px;
    left: 0;
    bottom: 0;
    text-align: center;
    font-size: 16px;
  }

  .index-header {
    height: auto;
    padding: 8px;
  }

  .index-logo {
    color: #fff;
    font-size: 18px;
    float: left;
  }

  .index-header .index-logo span {
    background: #1c83d2;
    border-radius: 4px;
    color: #ffffff;
    font-size: 22px;
    padding: 0 8px;
  }

  .index-user-wrap {
    float: right;
    padding: 8px 35px
  }

  .index-user-wrap .user-type {
    color: #fff;
    margin-right: 10px;
    display: inline-block;
    vertical-align: bottom;
  }

  .index-user-wrap .aExit {
    background: transparent
  }

  .index-user-wrap .aExit:hover {
    background: #0875c8
  }

  .header {
    position: absolute;
    width: 100%;
    height: 8%;
    z-index: 1;
  }

  .header h3 {
    color: #ffffff;
  }

  .heading-container span {
    color: #ffffff;
    padding: 0 2px;
  }

  .heading-container a {
    background: transparent;
  }

  .aExit {
    color: #409ce3;
    border-radius: 4px;
  }

  .hos-data,
  .city-data {
    top: 6%;
    position: absolute;
    width: 100%;
    overflow-y: auto;
    height: 80%;
  }

  .dots {
    position: absolute;
    top: 85%;
    left: 50%;
    margin-left: -81px;
  }

  .dot {
    padding: 0 8px;
    font-size: 80px;
    background: transparent;
    margin: 0 8px;
    color: #ffffff;
    cursor: pointer;
    opacity: 0.5;
  }

  .dot:hover,
  .dot1 {
    opacity: 1;
  }

  .turn {
    position: absolute;
    color: #ffffff;
    top: 45%;
    font-size: 32px;
    opacity: 0.5;
  }

  .prev {
    left: 20px;
  }

  .next {
    right: 20px;
  }

  .turn:hover {
    cursor: pointer;
    opacity: 1;
  }

  @media screen and (min-height:900px) {
    .platform .con {
      height: 50%;
      top: 30%;
    }
  }

  .heading-container .icon {
    color: #409ce3;
    font-size: 18px;
  }

  .footer {
    background-color: rgba(255, 255, 255, 0);
    position: absolute;
    color: white;
    text-align: center;
    bottom: 0;
    left: 0;
    right: 0;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
  }

</style>
