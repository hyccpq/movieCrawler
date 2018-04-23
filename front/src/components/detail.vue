<template>
  <div>
    <main class="movie-info">
      <h3 class="title">{{ movie.title }}</h3>
      <div class="create-time">收录时间:<time>{{ localTime(movie.meta.createdAt) }}</time></div>
      <div class="update-time">更新时间:<time>{{ localTime(movie.meta.updatedAt) }}</time></div>
      <ul class="movie-types">
        电影类型:
        <li v-for="item in movie.movieTypes">{{ item }}</li>
      </ul>
    </main>

  </div>
</template>

<script>
  import { mapState } from 'vuex'
  // import player from './plugin/player'
	export default {
		name: "detail",
		computed: {
      ...mapState({
        movie: store => store.movieDetail.movie
      })
		},
    components:{
			// player
    },
    beforeCreate(){
			this.$store.dispatch('getMovieDetail', this.$route.params.id)
    },
    methods: {
			localTime(UTCtime){
				let date = new Date(UTCtime)
        let localTime = date.toLocaleString()
        return localTime
      },
    }
	}
</script>

<style scoped>

</style>