/*
 * update by pengzhen on 2017/8/8
 * 注意： SHOW_ROOT_MENU 和SHOW_HOME不能同时为false

 * 配置系统信息
 */

const kConfig = {
  // 公司名称
  BUSINESS_NAME: 'XXX科技有限公司',

  // 公司主站
  BUSINESS_SITE: 'http://www.kindo.com.cn/',

  // 系统中文名称
  CN_NAME: 'XXX系统',

  // 系统英文名称
  EN_NAME: 'XXX',
  // 是否显示home界面--默认显示
  SHOW_HOME: true,
  // 是否显示最新消息
  SHOW_NEWINFO: false,

  // 是否显示更新日志
  SHOW_CHANGELOG: true,

  // 是否在 header 位置显示根节点菜单
  SHOW_ROOT_MENU: true,

  // 是否在 container 位置展开所有二级菜单
  EXPAND_ALL_MENU: true,

  // ajax 延时时间
  AJAX_DELAY: 10000,

  // ajax 超时时间
  AJAX_TIME_OUT: 300000
}

export default kConfig
