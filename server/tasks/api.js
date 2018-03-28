 // http://api.douban.com/v2/user/1000001/v2/movie/subject/:id
const http = require('request-promise-native');
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

async function fetchMovie(item) {
	const url = `http://api.douban.com/v2/movie/${item.doubanId}`
	
	let res = await http(url)
	
	try {
    res = JSON.parse(res)
      console.log(res);
  } catch (err) {
    console.log(err)
    res = null
  }
	
	return res
}

;(async () => {
  let movies = await Movie.find({
    $or: [
      {summary: {$exists: false}},
      {summary: null},
      {title: ''},
      {summary: ''}
    ]
  })

  for (let i = 0; i < movies.length; i ++) {
    let movie = movies[i]
    let movieData = await fetchMovie(movie)

    if (movieData) {
      let tags = movieData.tags || []

      movie.tags = []
      movie.summary = movieData.summary || ''
      movie.title = movieData.alt_title || movieData.title
      movie.rawTitle = movieData.title || ''

      if (movieData.attrs) {
        movie.movieTypes = movieData.attrs.movie_type || []

        let dates = movieData.attrs.pubdate || []
        let pubdates = []

        dates.map(item => {
          if (item && item.split('(').length > 0) {
            let parts = item.split('(')
            let date = parts[0]
            let country = '未知'

            if (parts[1]) {
              country = parts[1].split(')')[0]
            }

            pubdates.push({
              date: new Date(date),
              country
            })
          }
        })

        movie.pubdate = pubdates
      }


      tags.forEach(tag => {
        movie.tags.push(tag.name)
      })

      await movie.save()
    }
  }
})()