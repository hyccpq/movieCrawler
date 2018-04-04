const Router = require('koa-router')
const { resolve } = require('path')

export class Route {
	constructor(app, apiPath){
		this.app = app
		this.apiPath = apiPath
		this.router = new Router()
	}
	
	init(){
		glob.sync(resolve(this.apiPath, './**/*.js')).forEach(require)
	}
}

const controller = path => target => (target.prototype[symbolPreFix] = path)