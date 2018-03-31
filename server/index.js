const Koa = require('koa')
const mongooose = require('mongoose')
const { connect, initSchemas } = require('./database/init')
const routes = require('./routes')

const app = new Koa()
;(async () =>{
	await connect()
	
	initSchemas()
	// await require('./tasks/process')
	// await require('./tasks/api')
	// await require('./tasks/trailer_video_process')
	// await require('./tasks/qiniu')
})()

app
	.use(routes.routes())
	.use(routes.allowedMethods())

app.listen(5678, () => {
	console.log('服务运行于http://localhost:5678');
})