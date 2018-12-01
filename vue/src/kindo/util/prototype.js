/*
 * updated by pengzhen on 2017/6/21
 * peng_zhen@outlook.com
 * -------------------------------------------------
 * 扩展原型类:
 * 扩展原型常用方法
 *
 */

/* eslint-disable no-extend-native */

/*
 * 数字字节数转化为KB，MB的大小
 * ex:  let zz=1000,z.formatByte返回1000Byte
 */
Number.prototype.formatByte = function () {
  let bytes = this.valueOf()
  if (bytes === 0) return '0 Byte'
  let k = 1024
  let sizes = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i]
  // return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
}
/*
 * 字符串格式化
 * ex:  '{0} world {1}'.formatString('hello','!!!!') => hello world !!!!
 */
String.prototype.formatString = function () {
  let str = this
  for (let i = 0; i < arguments.length; i++) {
    let exp = new RegExp('\\{' + (i) + '\\}', 'gm')

    str = str.replace(exp, arguments[i])
  }
  return str
}

/*
 * 获取字节长度
 * ex: '你好,world'.byteLength() => 10
 */
String.prototype.byteLength = function () {
  let byteLength = 0
  let l = this.length
  if (l) {
    for (let i = 0; i < l; i++) {
      if (this.charCodeAt(i) > 255) {
        byteLength += 2
      } else {
        byteLength++
      }
    }
    return byteLength
  } else {
    return 0
  }
}

/**
 * 字符串格式日期转 Date
 * ex: '2016-01-01 02:00'.toDate().formatDate() =>  "2016-01-01"
 */
String.prototype.toDate = function () {
  if (this instanceof Date) {
    return this
  }

  var date = this.toString()

  var a = date.split(' ')
  var b = a[0].split('-') || a[0].split('/')
  var c = a.length > 1 ? a[1].split(':') : ''

  return new Date(Date.UTC(b[0] || 0, (b[1] || 1) - 1, b[2] || 1, (c[0] || 8) - 8, c[1] || 0, c[2] || 0))
}

/**
 * 字符串格式转化为制定格式的数字
 * ex: '211'.toFixed(2)转化为211.00
 */
String.prototype.toFixed = function (parse) {
  if (parseFloat(this)) {
    return parseFloat(this).toFixed(parse)
  } else {
    let start = '0.'
    let qq = 0
    while (qq < parse) {
      start += '0'
      qq++
    }
    return start
  }
}

/**
 * 字符串格式转化为制定格式的数字
 * ex: '211'.toFixed(2)转化为211.00
 */
String.prototype.startWith = function (s) {
  if (s === null || s === '' || this.length === 0 || s.length > this.length) {
    return false
  }
  if (this.substr(0, s.length) === s) {
    return true
  } else {
    return false
  }
}

/*
 * Date 原型扩展
 */
/**
 * 日期格式化
 * @formatStr: 格式化参数, 默认yyyy-MM-dd
 * @return:    Date
 * ex:         new Date().formatDate('yyyy-MM-dd')  =>  '2016-12-12'
 */
Date.prototype.formatDate = function (formatStr) {
  if (formatStr === '' || formatStr === undefined || formatStr === null) {
    formatStr = 'yyyy-MM-dd'
  }

  var dict = {
    'yyyy': this.getFullYear(),
    'M': this.getMonth() + 1,
    'd': this.getDate(),
    'H': this.getHours(),
    'm': this.getMinutes(),
    's': this.getSeconds(),
    'MM': ('' + (this.getMonth() + 101)).substr(1),
    'dd': ('' + (this.getDate() + 100)).substr(1),
    'HH': ('' + (this.getHours() + 100)).substr(1),
    'mm': ('' + (this.getMinutes() + 100)).substr(1),
    'ss': ('' + (this.getSeconds() + 100)).substr(1)
  }
  return formatStr.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
    return dict[arguments[0]]
  })
}

/**
 * 日期格式化
 * @formatStr: 格式化参数, 默认yyyy-MM-dd HH:mm
 * @return:    Date
 * ex:         new Date().formatTime('yyyy-MM-dd HH:mm:ss')  =>  '2016-12-12 12:00:00'
 */
Date.prototype.formatTime = function (formatStr) {
  if (formatStr === '' || formatStr === undefined || formatStr === null) {
    formatStr = 'yyyy-MM-dd HH:mm:ss'
  }

  return this.formatDate(formatStr)
}

/**
 * des:        日期操作
 * @proStr:    格式化参数
 * @return:    Date
 * ex:         new Date().proDate('{%y+1}-{%M+2}-{%d+1}-{%H+1}-{%m+1}-{%s+1}') //年月日时分秒全部加1
 */
Date.prototype.proDate = function (proStr) {
  var dealWith = function (str, date) {
    let t = str.substr(0, 1)
    let num = 0
    if (str.indexOf('+') > -1) {
      num = str.substr(str.indexOf('+'))
    } else if (str.indexOf('-') > -1) {
      num = str.substr(str.indexOf('-'))
    }
    switch (t) {
      case 'y':
        date.setFullYear(date.getFullYear() + parseInt(num))
        break
      case 'M':
        date.setMonth(date.getMonth() + parseInt(num))
        break
      case 'd':
        date.setDate(date.getDate() + parseInt(num))
        break
      case 'H':
        date.setHours(date.getHours() + parseInt(num))
        break
      case 'm':
        date.setMinutes(date.getMinutes() + parseInt(num))
        break
      case 's':
        date.setSeconds(date.getSeconds() + parseInt(num))
        break
    }
    return date
  }

  let arr = []
  let date
  arr = proStr.split('{%')
  for (var i = 1; i < arr.length; i++) {
    arr[i] = arr[i].replace('}-', '')
    arr[i] = arr[i].replace('}', '')
    date = dealWith(arr[i], this)
  }
  return date
}

/*
 * 为了避免日期类型没有原型方法而扩展, 无实际意义
 */
Date.prototype.toDate = function () {
  return this
}

/*
 * Number 原型扩展
 */
/**
 * 毫秒数转日期
 * @formatStr: 格式化参数, 默认yyyy-MM-dd HH:mm
 * ex:         1483943989639.toDate()  =>  Mon Jan 09 2017 14:39:49 GMT+0800 (中国标准时间)
 */
Number.prototype.toDate = function () {
  return new Date(this)
}
