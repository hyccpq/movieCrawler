import { controller, post } from '../lib/decorator'

import { checkPassword } from '../service/admin'

@controller('/api/v0/user')
export class User {
	@post('/')
	async loadControl (ctx, next) {
		
		const { username, password } = ctx.request.body
		console.log(username, password);
		const matchData = await checkPassword(username, password)
		
		if(matchData.match) {
			ctx.body = {
				succsee: true
			}
		} else {
			ctx.body = {
				success: false,
				errcode: '用户名或者密码不正确'
			}
		}
	}
}