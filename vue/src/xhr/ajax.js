import xhr from './xhr.js'
// let _ajax
// export default _ajax
let _ajax = $.ajax
$.ajax = options => {
  let optionsBack = Object.assign({}, options)

  options.timeout = 30000
  // 统一请求资源
  options.url = xhr.setUri(options.url)

  // 扩展ajax 源生方法
  options.beforeSend = (XMLHttpRequest, setting) => {
    k.root.start()
    if (k.util.cache.get(k.config.user.TOKEN, 'session')) {
      XMLHttpRequest.setRequestHeader('token', k.util.cache.get(k.config.user.TOKEN, 'session'))
    }
    optionsBack.beforeSend && optionsBack.beforeSend.apply(this, arguments)
  }
  return _ajax(options)
}
_ajax.get = function (url, params) {
  return $.ajax({
    method: 'get',
    url: url,
    data: params,
    success: (res) => {
      if (res.code === '200' || res.code === 200) {
        k.root.finish()
      } else {
        k.root.alert(res.message)
        k.root.error()
      }
    },
    error: (xhr, textStatus, erorThrown) => {
      k.root.alert(textStatus)
      k.root.error()
    }
  })
}
_ajax.post = function (url, params) {
  return $.ajax({
    method: 'post',
    url: url,
    data: params,
    success: (res) => {
      if (res.code === '200' || res.code === 200) {
        k.root.finish()
      } else {
        k.root.alert(res.message, 'warning')
        k.root.error()
      }
    },
    error: (xhr, textStatus, erorThrown) => {
      k.root.alert(textStatus, 'warning')
      k.root.error()
    }
  })
}
export default _ajax
