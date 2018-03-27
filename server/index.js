const Koa = require('koa')
const mongooose = require('mongoose')
const { connect, initSchemas } = require('./database/init')

;(async () =>{
	await connect()
	
	initSchemas()
	require('./tasks/process')
})()