const Koa = require('koa')
const { connect, initSchemas } = require('./database/init')
// const routes = require('./routes')
const { resolve } = require('path')
const R = require('ramda')
const MIDDLEWARES = ['router']
const prod = process.env.NODE_ENV === 'production'

if(!prod){
	MIDDLEWARES.push('webpack-dev')
}

const app = new Koa()
;(async () =>{
	await connect()
	
	initSchemas()
	// await require('./tasks/process')
	// await require('./tasks/api')
	// await require('./tasks/trailer_video_process')
	// await require('./tasks/qiniu')
	
	const useMiddlewares = app => {
		R.map(
			R.compose(
				R.forEachObjIndexed(
					initWith => initWith(app)
				),
				require,
				name => resolve(__dirname, `./middlewares/${name}`)
			)
		)(MIDDLEWARES)
	}
	
	useMiddlewares(app)
	
	app.listen(5678, () => {
		console.log('服务运行于\nhttp://localhost:5678');
	})
	
	
})()

