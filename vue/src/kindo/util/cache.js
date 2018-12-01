const cache = {
  set: (key, value, type) => {
    switch (type) {
      case 'local':
      case 'session':
        if (value !== null && value !== undefined) {
          value = window.btoa(window.encodeURIComponent(JSON.stringify(value)))
        }
        global[type + 'Storage'].setItem(key, value)
        break
      default:
        global.cache = {
          [key]: value
        }
        break
    }
  },
  get: (key, type) => {
    let value = ''
    switch (type) {
      case 'local':
      case 'session':
        value = window[type + 'Storage'].getItem(key) && JSON.parse(window.decodeURIComponent(window.atob(window[type + 'Storage'].getItem(key))))
        break
      default:
        if (global.cache && global.cache.hasOwnProperty(key)) {
          return global.cache.key
        } else if (window.localStorage.getItem(key)) {
          return window.localStorage.getItem(key)
        } else if (window.sessionStorage.getItem(key)) {
          return window.sessionStorage.getItem(key)
        }
        break
    }
    return value
  },
  remove: (key, type) => {
    switch (type) {
      case 'local':
      case 'session':
        window[type + 'Storage'].removeItem(key)
        break
      default:
        if (window.cache.hasOwnProperty(key)) {
          delete window.cache.key
        } else if (window.localStorage(key) !== null) {
          window.localStorage.removeItem(key)
        } else if (window.sessionStorage(key) !== null) {
          window.sessionStorage.removeItem(key)
        }
    }
  }
}
export default cache
