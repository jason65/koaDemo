import axios from 'axios'
import xhr from './xhr.js'
axios.defaults.timeout = k.config.AJAX_TIME_OUT
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.url = xhr.setUri(config.url)
  if (k.util.cache.get(k.config.user.TOKEN, 'session')) {
    config.headers.token = k.util.cache.get(k.config.user.TOKEN, 'session')
  }
  k.root.start()
  return config
}, function (error) {
  // Do something with request error
  k.root.error()
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  if (response.data.code === '200' || response.data.code === 200) {
    k.root.finish()
  } else {
    k.root.error()
    k.root.alert(response.data.message, 'warning')
  }
  // Do something with response data
  return response.data
}, function (error) {
  // Do something with response error
  k.root.error()
  return Promise.reject(error)
})

export default axios
