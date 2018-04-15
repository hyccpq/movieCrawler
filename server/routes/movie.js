import { getAllMovies, getMovieDet, getRelativeMoives} from '../service/getMovieDatabase'
import { controller, get } from '../lib/decorator'

@controller('/api/v0/movies')
export class MovieController {
	@get('/')
	async getMovies (ctx, next) {
		const { type, year, limit, skip } = ctx.query
		const movies = await getAllMovies(type, year, parseInt(limit), skip)
		ctx.body = {
			movies
		}
	}
	
	@get('/:id')
	async getMovieDetail (ctx, next) {
		const id = ctx.params.id
		const movie = await getMovieDet(id)
		const relativeMovies = await getRelativeMoives(movie)
		ctx.body = {
			data: {
				movie,
				relativeMovies
			}
		}
	}
}