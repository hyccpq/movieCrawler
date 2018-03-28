// const movies = [{
// 	cover:
// 		{ links: 'https://movie.douban.com/trailer/228920/#content',
// 			covers: 'https://img1.doubanio.com/img/trailer/medium/2516927718.jpg?1521617838' },
// 	video: 'http://vt1.doubanio.com/201803231419/d7be4b2c7458cc86085e0f455d46ae9e/view/movie/M/302270782.mp4'
// }]

const qiniu = require('qiniu')
const nanoId = require('nanoid')
const config = require('../config/index')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)

const cfg = new qiniu.conf.Config()

const client = new qiniu.rs.BucketManager(mac, cfg)

const uploadToQiniu = async (url, key) => {
	return new Promise((resolve, reject) => {
		client.fetch(url, bucket, key, (err, ret , info) => {
			if(err){
				reject(err)
			} else {
				if(info.statusCode === 200){
					resolve({ key })
				} else {
					reject(info)
				}
			}
		})
	})
}

;(async () => {
	let movies = await Movie.find({
		$or: [
			{ videoKey: { $exists : false } },
			{ videoKey: null },
			{ videoKey: '' }
		]
	})
		console.log(movies);
	
	movies.forEach(async movie => {
		if(movie.video && !movie.key){
			try {
				console.log('正在上传video');
				let videoData = await uploadToQiniu(movie.video, nanoId() + '.mp4');
				console.log('正在传封面图');
				let coverData = await uploadToQiniu(movie.cover, nanoId() + '.png');
				let posterData = await uploadToQiniu(movie.poster, nanoId() + '.png');
				
				if(videoData.key){
					movie.videoKey = videoData.key;
				}
				
				if(coverData.key){
					movie.coverKey = coverData.key;
				}
				
				if(posterData.key){
					movie.poster = posterData.key;
				}
				console.log(movie);
				await movie.save();
			} catch (err) {
				console.log(err);
			}
		}
	})
})()