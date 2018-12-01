<template>
  <div class="con">
    <div class="header">
      <div class="logo"></div>
    </div>
    <div class="main">
      <div class="logo_left">
        <div class="computer"></div>
        <h3>郑大一附院医保智能监管平台</h3>
      </div>
      <div class="logo_right">
        <div class="top">系统登录</div>
        <form action="" @keyup.enter="login">
          <ul>
            <li class="firLi">
              <b></b>
              <input type="text" id="userName" v-model="form.LOGIN_NAME">
            </li>
            <li class="secLi">
              <b></b>
              <input type="password" v-model="form.PASSWORD">
            </li>
            <li class="thirdLi" id="login" @click="login">登陆</li>
          </ul>
        </form>
      </div>
    </div>
    <div class="footer">
      <p>武汉金豆医疗数据科技有限公司 ©www.kindo.com.cn</p>
      <p>建议您使用谷歌chrome、IE10及以上版本浏览器</p>
    </div>
  </div>
</template>
<script>
  import config from './config/'
  // import axios from 'axios'
  let self
  export default ({
    name: 'Login',
    data() {
      return ({
        form: {
          LOGIN_NAME: '',
          PASSWORD: ''
        },
        tip: false
        // startloding: true
      })
    },
    created() {
      self = this
    },
    mounted() {
      this.$nextTick(() => {})
    },
    methods: {
      login() {
        let para = Object.assign({}, self.form)
        para.PASSWORD = window.btoa(para.PASSWORD)
        this.ajax.post(config.api.loginCheck, para).then(res => {
          if (res.code === '200' || res.code === 200) {
            k.util.cache.set(k.config.user.TOKEN, res.data.token, 'session')
            k.util.cache.set(k.config.user.INFO, res.data.userInfo, 'session')
            window.location.reload()
          }
        })
      }
    }
  })

</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    font-family: '微软雅黑';
  }

  .con {
    width: 100%;
    height: 100%;
    background: url(~assets/img/bg.png) no-repeat top center;
    position: relative;
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: content-box;
  }

  .header {
    width: 100%;
    height: 74px;
    background: #0875c8;
    padding-top: 10px;
  }

  .logo {
    width: 315px;
    height: 60px;
    background: url(~assets/img/imges.png) no-repeat -42px -392px;
    margin: 0 auto;
  }

  .ieTip {
    position: absolute;
    left: 0;
    top: 70px;
    height: 30px;
    width: 100%;
    line-height: 30px;
    text-align: right;
    padding: 5px 50px 5px 5px;
  }

  .main {
    width: 58%;
    background: #ffffff;
    border-radius: 10px;
    clear: both;
    overflow: hidden;
    margin: 5.7% auto 0;
  }

  .logo_left {
    width: 50%;
    float: left;
  }

  .computer {
    width: 211px;
    height: 199px;
    background: url(~assets/img/logo_cum.png) 0 -501px no-repeat;
    margin: 20% auto 0;
  }

  .logo_left h3 {
    font-size: 24px;
    font-weight: normal;
    color: #177dcb;
    text-align: center;
    width: 100%;
    margin: 52px auto 24%;
  }

  .logo_right {
    width: 50%;
    float: left;
    padding-right: 10%;
  }

  .logo_right .top {
    width: 81.6%;
    font-size: 18px;
    color: #7f7f7f;
    margin: 24% auto 0;
    border-bottom: 1px solid #dadadf;
    float: right;
    padding: 0 0 19px 18px;
  }

  .logo_right ul {
    clear: both;
    margin: 22px 17px 0 0;
    float: right;
    width: 100%;
    padding-left: 17px;
  }

  .logo_right ul li {
    position: relative;
    border: 1px solid #d9d9de;
  }

  .logo_right ul li,
  .logo_right ul li input {
    list-style: none;
    cursor: pointer;
    width: 74%;
    height: 41px;
    line-height: 41px;
    margin: 0 auto 12px;
    background: #ffffff;
    color: #666666;
    font-size: 14px;
    float: right;
    border-radius: 3px;
  }

  .logo_right ul li input {
    position: absolute;
    top: 0;
    left: 0;
    padding-left: 55px;
    border: none;
    height: 39px;
    width: 100%;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  }

  .logo_right ul li b {
    position: absolute;
    top: 7px;
    left: 13px;
    display: block;
    z-index: 333;
  }

  .logo_right ul li.firLi b {
    height: 24px;
    width: 27px;
    background: url(~assets/img/imges.png) no-repeat -43px -452px;
  }

  .logo_right ul li.secLi b {
    height: 24px;
    width: 21px;
    background: url(~assets/img/imges.png)no-repeat -45px -505px;
  }

  .logo_right .thirdLi {
    background: #0875c8;
    color: #ffffff;
    margin: 74px auto 24%;
    text-align: center;
    font-weight: bold;
  }

  .footer {
    width: 100%;
    /*margin: 5% 0 30px 0;*/
    position: absolute;
    bottom: 10px;
    text-align: center;
  }

  .footer p {
    font-size: 14px;
    color: #535354;
  }

</style>
