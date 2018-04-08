'use strict'
const webpack = require('webpack')
const { resolve } = require('path')
// const ExtractTextPlugin = require()
const HtmlWebpackPlugin = require('html-webpack-plugin')

let config = {
	entry: '../src/main.js',
	output:{
		path: resolve(__dirname, '../dist')
	},
	module: {
		rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
	      options: {
		      loaders: {
			      css: ['vue-style-loader', 'css-loader'],
		      },
		      preserveWhitespace: false,
		      postcss: [require('autoprefixer')({ browsers: ['last 7 versions'] })]
	      }
      },
			{
				test:/\.js$/,
				exclude:/(node_modules|bower_components)/,
				use:{
					loader:'babel-loader',
					options:{
						presets:['env'],
						plugins:['transform-runtime']
					}
				}
			},
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|svgz)$/,
				use:{
					loader: 'file-loader',
					options: {
						name: 'assets/images/[name].[ext]?[hash]'
					}
				}
			}
		
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: '../src/index.html'
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer:{
		historyApiFallback: true,
		noInfo: true,
		overlay: true,
		port:9000,
		hot:true,
		inline:true,
		open:true
	}
}

module.exports = config