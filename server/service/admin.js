import mongoose from 'mongoose'
const User = mongoose.model('User')

export const checkPassword = async (email, passward) => {
	let match = false
	const user = await User.findOne({ email })
	
	if(user) {
		match = await user.comparePassword(passward, user.password)
	}
	
	return {
		match,
		user
	}
}