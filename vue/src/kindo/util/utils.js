/*
 * updated by pengzhen on 2017/1/9
 * peng_zhen@outlook.com
 * -------------------------------------------------
 * 工具类:
 * 提供 string 处理, date 处理, 常用方法处理
 *
 */

/*
 * 工具类常用方法实现
 */
let util = {
  /**
   * 获取 url 参数
   * ex: kindo.util.queryString('name')
   */
  queryString(name, url) {
    if (!url) url = window.location.href
    name = name.replace(/[[\]]/g, '\\$&')
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
    let results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  },
  /*
   * 数组对象转 tree
   * @nodes   [{}]          :   数据对象
   * @idKey   string        :   唯一键
   * @pIdKey  string        :   父项唯一键
   * @childrenKey  string   :   children key
   * ex                     :   kindo.util.toTree([]) => []
   */
  toTree: (nodes, idKey = 'id', pIdKey = 'pId', childrenKey = 'children') => {
    let map = {}
    let node
    let roots = []

    nodes.forEach((item, index) => {
      map[item[idKey]] = index
    })
    for (let i = 0; i < nodes.length; i += 1) {
      node = nodes[i]
      if (node[pIdKey] !== '-1' && node[pIdKey] !== '' && nodes[map[node[pIdKey]]]) {
        if (!nodes[map[node[pIdKey]]][childrenKey]) {
          nodes[map[node[pIdKey]]][childrenKey] = []
          nodes[map[node[pIdKey]]][childrenKey].push(node)
        } else {
          nodes[map[node[pIdKey]]][childrenKey].push(node)
        }
      } else {
        roots.push(node)
      }
    }

    return roots
  },

  /**
   * 格式化日期对象
   * @date  any : 可转换为 Date 类型的任意参数
   * @format  string  : 格式化字符串
   * return string  : 格式化后的日期字符串
   * ex : kindo.util.formatDate(new Date()) =>  '2016-01-10'
   */
  formatDate: (date, format = 'yyyy-MM-dd') => {
    if (date === '' || date === undefined || date === null) return
    if (typeof format !== 'string') format = 'yyyy-MM-dd'

    if (date instanceof Date) {
      return date.formatDate(format)
    } else {
      return date.toDate().formatDate(format)
    }
  },

  /**
   * 格式化时间对象
   * @date  any : 可转换为 Date 类型的任意参数
   * @format  string  : 格式化字符串
   * return string  : 格式化后的时间字符串
   * ex : kindo.util.formatTime(new Date()) =>  '2016-01-10 21:01:01'
   */
  formatTime: (date, format = 'yyyy-MM-dd HH:mm:ss') => {
    if (date === '' || date === undefined || date === null) return
    date = new Date(date)
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    let h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    let minute = date.getHours()
    minute = minute < 10 ? ('0' + minute) : minute
    var second = date.getSeconds()
    second = second < 10 ? ('0' + second) : second
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
  },

  /**
   * 密码md5加密
   * @data : 字符串
   * return : 返回字符串MD5的十六进制表示。
   * ex: kindo.util.md5("160-bit hash") => "90d925d853c3d35cd54070bb75280fefad9de9e7"
   */
  md5: (string) => {
    function RotateLeft(lValue, iShiftBits) {
      return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
    }

    function AddUnsigned(lX, lY) {
      let lX4, lY4, lX8, lY8, lResult
      lX8 = (lX & 0x80000000)
      lY8 = (lY & 0x80000000)
      lX4 = (lX & 0x40000000)
      lY4 = (lY & 0x40000000)
      lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF)
      if (lX4 & lY4) {
        return (lResult ^ 0x80000000 ^ lX8 ^ lY8)
      }
      if (lX4 | lY4) {
        if (lResult & 0x40000000) {
          return (lResult ^ 0xC0000000 ^ lX8 ^ lY8)
        } else {
          return (lResult ^ 0x40000000 ^ lX8 ^ lY8)
        }
      } else {
        return (lResult ^ lX8 ^ lY8)
      }
    }

    function F(x, y, z) {
      return (x & y) | ((~x) & z)
    }

    function G(x, y, z) {
      return (x & z) | (y & (~z))
    }

    function H(x, y, z) {
      return (x ^ y ^ z)
    }

    function I(x, y, z) {
      return (y ^ (x | (~z)))
    }

    function FF(a, b, c, d, x, s, ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac))
      return AddUnsigned(RotateLeft(a, s), b)
    }

    function GG(a, b, c, d, x, s, ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac))
      return AddUnsigned(RotateLeft(a, s), b)
    }

    function HH(a, b, c, d, x, s, ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac))
      return AddUnsigned(RotateLeft(a, s), b)
    }

    function II(a, b, c, d, x, s, ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac))
      return AddUnsigned(RotateLeft(a, s), b)
    }

    function ConvertToWordArray(string) {
      let lWordCount
      let lMessageLength = string.length
      let lNumberOfWordsTemp1 = lMessageLength + 8
      let lNumberOfWordsTemp2 = (lNumberOfWordsTemp1 - (lNumberOfWordsTemp1 % 64)) / 64
      let lNumberOfWords = (lNumberOfWordsTemp2 + 1) * 16
      let lWordArray = Array(lNumberOfWords - 1)
      let lBytePosition = 0
      let lByteCount = 0
      while (lByteCount < lMessageLength) {
        lWordCount = (lByteCount - (lByteCount % 4)) / 4
        lBytePosition = (lByteCount % 4) * 8
        lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition))
        lByteCount++
      }
      lWordCount = (lByteCount - (lByteCount % 4)) / 4
      lBytePosition = (lByteCount % 4) * 8
      lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition)
      lWordArray[lNumberOfWords - 2] = lMessageLength << 3
      lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29
      return lWordArray
    }

    function WordToHex(lValue) {
      let WordToHexValue = ''
      let WordToHexValueTemp = ''
      let lByte
      let lCount
      for (lCount = 0; lCount <= 3; lCount++) {
        lByte = (lValue >>> (lCount * 8)) & 255
        WordToHexValueTemp = '0' + lByte.toString(16)
        WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2)
      }
      return WordToHexValue
    }

    function Utf8Encode(string) {
      string = string.replace(/\r\n/g, '\n')
      let utftext = ''

      for (let n = 0; n < string.length; n++) {
        let c = string.charCodeAt(n)

        if (c < 128) {
          utftext += String.fromCharCode(c)
        } else if ((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192)
          utftext += String.fromCharCode((c & 63) | 128)
        } else {
          utftext += String.fromCharCode((c >> 12) | 224)
          utftext += String.fromCharCode(((c >> 6) & 63) | 128)
          utftext += String.fromCharCode((c & 63) | 128)
        }
      }

      return utftext
    }

    let x = []
    let k, AA, BB, CC, DD, a, b, c, d
    let S11 = 7
    let S12 = 12
    let S13 = 17
    let S14 = 22
    let S21 = 5
    let S22 = 9
    let S23 = 14
    let S24 = 20
    let S31 = 4
    let S32 = 11
    let S33 = 16
    let S34 = 23
    let S41 = 6
    let S42 = 10
    let S43 = 15
    let S44 = 21

    string = Utf8Encode(string)

    x = ConvertToWordArray(string)

    a = 0x67452301
    b = 0xEFCDAB89
    c = 0x98BADCFE
    d = 0x10325476

    for (k = 0; k < x.length; k += 16) {
      AA = a
      BB = b
      CC = c
      DD = d
      a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478)
      d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756)
      c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB)
      b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE)
      a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF)
      d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A)
      c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613)
      b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501)
      a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8)
      d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF)
      c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1)
      b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE)
      a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122)
      d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193)
      c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E)
      b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821)
      a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562)
      d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340)
      c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51)
      b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA)
      a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D)
      d = GG(d, a, b, c, x[k + 10], S22, 0x2441453)
      c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681)
      b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8)
      a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6)
      d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6)
      c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87)
      b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED)
      a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905)
      d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8)
      c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9)
      b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A)
      a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942)
      d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681)
      c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122)
      b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C)
      a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44)
      d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9)
      c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60)
      b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70)
      a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6)
      d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA)
      c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085)
      b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05)
      a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039)
      d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5)
      c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8)
      b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665)
      a = II(a, b, c, d, x[k + 0], S41, 0xF4292244)
      d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97)
      c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7)
      b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039)
      a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3)
      d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92)
      c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D)
      b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1)
      a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F)
      d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0)
      c = II(c, d, a, b, x[k + 6], S43, 0xA3014314)
      b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1)
      a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82)
      d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235)
      c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB)
      b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391)
      a = AddUnsigned(a, AA)
      b = AddUnsigned(b, BB)
      c = AddUnsigned(c, CC)
      d = AddUnsigned(d, DD)
    }

    let temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d)

    return temp.toLowerCase()
  }
}

export default util