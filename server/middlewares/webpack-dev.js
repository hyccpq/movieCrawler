import dev from './dev/devMiddleware'
import hot from './dev/hotMiddelwate'
import webpack from 'webpack'
import serve from 'koa-static'
import { resolve } from 'path'
import webpackConfig from '../../front/build/webpack.dev.conf'

const compiler = webpack(webpackConfig)

export const webpackDev = app => {
	app.use(dev(compiler))
		.use(hot(compiler))
	
	app.use(serve(resolve(__dirname, '/front/dist')))
}