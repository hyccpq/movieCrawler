const Koa = require('koa')
const { connect } = require('./database/init')


;(async () =>{
	await connect()
})()