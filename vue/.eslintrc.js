// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow spacing between function identifiers and their invocations
    'func-call-spacing': [0, "always"],
    // 允许函数定义时括号前面要不要有空格
    "space-before-function-paren": [0, "always"],
    // 允许扩展native对象
    "no-extend-native": 0,
    // 允许在使用new构造一个实例后不赋值
    "no-new": 0,
    // 允许箭头函数用小括号括起来
    'arrow-parens': 0,
    // 允许生成器函数*的前后空格
    'generator-star-spacing': 0,
    // 允许多余的转义符
    'no-useless-escape': 0,
    'template-curly-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    "indent": ["off", 2],

    // 警告变量定义后未使用
    "no-unused-vars": 1,
  },
  globals: {
    'global': true,
    'k': true,
    '$': true,
    'jQuery': true
  }
}
