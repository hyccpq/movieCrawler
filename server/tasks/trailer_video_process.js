const cp = require('child_process');
const { resolve } = require('path');

const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');


module.exports = async() => {
	let movies = await Movie.find({
		$or:[
			{ video: {$exists: false } },
			{ video: null }
		]
	})
	const script = resolve(__dirname, '../crawler/video.js');
	const child = cp.fork(script, []);
	let invoked = false;
	
	child.on('error', err => {
		if(invoked)return;
		invoked = true;
		console.log(err);
	})
	
	child.on('exit', code => {
		if(invoked)return;
		invoked = true;
		let err = code === 0 ? null : new Error('exit code' + code);
		
		console.log(err);
	})
	
	child.on('message', async data => {
		let movie = await Movie.findOne({
			doubanId : data.doubanId
		})
		
		if(data.video) {
			movie.video = data.video;
			movie.cover = data.cover;
			
			await movie.save()
		} else {
			await movie.remove()
		}
		
		console.log(data);
	})
	
	child.send(movies)
}