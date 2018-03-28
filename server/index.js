const Koa = require('koa')
const mongooose = require('mongoose')
const { connect, initSchemas } = require('./database/init')

;(async () =>{
	await connect()
	
	initSchemas()
	await require('./tasks/process')
	require('./tasks/api')
})()