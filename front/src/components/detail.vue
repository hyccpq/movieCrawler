<template>
  <div v-if="showDetail">
    <main class="movie-info">
      <h3 class="title">{{ movie.title }}</h3>
      <div class="create-time">收录时间:<time>{{ localTime(movie.meta.createdAt) }}</time></div>
      <div class="update-time">更新时间:<time>{{ localTime(movie.meta.updatedAt) }}</time></div>
      <ul class="movie-types">
        电影类型:
        <li v-for="item in movie.movieTypes">{{ item }}</li>
      </ul>
      <myplayer :option="opt"></myplayer>
    </main>

  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import player from './plugin/player'
	export default {
		name: "detail",
    data(){
			return {
				showDetail: false,
        opt:{}
      }
    },
		computed: {
      ...mapState({
        movie: store => store.movieDetail.movie
      })
		},
    components:{
			myplayer:player
    },
    async beforeCreate(){
			await this.$store.dispatch('getMovieDetail', this.$route.params.id)
      this.showDetail = true
    },
    mounted(){

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