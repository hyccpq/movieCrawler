'use strict'
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base.conf')

const dev = merge(baseConfig, {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]
})

module.exports = dev