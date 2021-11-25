// 开发环境配置
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

//导出
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
