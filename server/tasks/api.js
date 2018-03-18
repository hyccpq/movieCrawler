 // http://api.douban.com/v2/user/1000001/v2/movie/subject/:id

const http = require('request-promise-native');

async function fetchMovie(item) {
	const url = `http://api.douban.com/v2/user/1000001/v2/movie/subject/${item}`
	
	const res = await http(url);
	
	return res;
}

;(async () =>{
	movies.map(async movie =>{
		let movieData = fetchMovie(movie);
	})
 })()