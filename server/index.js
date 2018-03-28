const Koa = require('koa')
const mongooose = require('mongoose')
const { connect, initSchemas } = require('./database/init')

;(async () =>{
	await connect()
	
	initSchemas()
	// await require('./tasks/process')
	// await require('./tasks/api')
	// await require('./tasks/trailer_video_process')
	await require('./tasks/qiniu')
})()