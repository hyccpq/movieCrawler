import { controller, post } from '../lib/decorator'

import { checkPassword } from '../service/admin'

@controller('/api/v0/user')
class User {
	@post('/')
	async loadControl (ctx, next) {
		const { email, password } = ctx.request.body
		const matchData = await checkPassword(email, password)
		
		if(matchData.data) {
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