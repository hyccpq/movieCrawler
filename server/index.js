const Koa = require('koa')
const { connect, initSchemas, initAdmin } = require('./database/init')
// const routes = require('./routes')
const { resolve } = require('path')
const R = require('ramda')
const MIDDLEWARES = ['bodyparser', 'router', 'logs']
const prod = process.env.NODE_ENV === 'production'
	console.log(process.env.NODE_ENV);
if(!prod){
	MIDDLEWARES.push('webpack-dev')
} else {
	MIDDLEWARES.push('prod')
}

const app = new Koa()

;(async () =>{
	await connect()
	
	initSchemas()
	
	await initAdmin()
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

