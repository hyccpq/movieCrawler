'use strict'
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')

const dev = merge(baseConfig, {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
    host: '127.0.0.1',
    port: 8010,
    historyApiFallback: false,
    noInfo: true,
    open: true
	}
})

module.exports = dev