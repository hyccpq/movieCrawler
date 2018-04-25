<template>
  <div v-if="showDetail">
    <main class="movie-info">
      <section class="movie-head">
        <div class="movie-center">
          <h3 class="title">{{ movie.title }}</h3>
          <div class="time-area">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="one-line">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{ movie.title }}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="time one-line">收录于：<time>{{ localTime(movie.meta.createdAt) }}</time></div>
            <div class="time one-line">更新于：<time>{{ localTime(movie.meta.updatedAt) }}</time></div>
          </div>
          <div class="movie-type">
            <div class="typename">电影类型：</div>
            <ul class="types">
              <li v-for="item in movie.movieTypes" class="type">{{ item }}</li>
            </ul>
          </div>
        </div>

      </section>
      <section class="movie-all">
        <myplayer :option="opt" class="player"></myplayer>
        <div class="relative-area">
          <relative :relativeMovie="relativeMovies"></relative>
        </div>
      </section>
      <section class="comment-details">
        <div class="movie-tag">
          <div>标签:</div>

          <el-tag type="warning"
                  v-for="(tag, key) in movie.tags"
                  :style="{marginLeft:key === 0 ? '0' : '30px'}">
            {{ tag }}
          </el-tag>

        </div>
      </section>
    </main>

  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import player from './plugin/player'
  import relative from './plugin/relative'
  import { breadcrumb, breadcrumbItem, tag } from 'element-ui'
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
        movie: store => store.movieDetail.movie,
        relativeMovies: store => store.movieDetail.raletiveMovie
      })
		},
    components:{
			myplayer:player,
      elBreadcrumb:breadcrumb,
      elBreadcrumbItem:breadcrumbItem,
      elTag:tag,
      relative
    },
    async beforeCreate(){
			await this.$store.dispatch('getMovieDetail', this.$route.params.id)
      this.showDetail = true
      this.opt = {
				video:{
		        url: 'http://uploads.kalecgos.top/' + this.movie.videoKey,
		        pic: 'http://uploads.kalecgos.top/' + this.movie.coverKey
          }
      }
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

<style scoped lang="less">
.movie-info {
  .movie-head{
    border-bottom: 1px solid #c0c0c0;
    .movie-center {
      width: 1280px;
      margin: 0 auto;
      padding: 20px 0 30px 0;
      .time-area {
        margin: 10px 0;
        &:after{
          display: block;
          clear:both;
          content: '';
          visibility: hidden;
          height: 0;
        }
        .one-line {
          height: 22px;
          float: left;
          font-size: 1rem;
          line-height: 22px;
        }
        .time {
          padding-left: 40px;
          color: #5f6265;
        }
      }

      .title {
        font-size: 1.5rem;
        padding: 10px 0;
      }
      font-size: 1rem;
      .movie-type {
        overflow: hidden;
        margin: 10px 0;
        .typename {
          float: left;
        }
        .types {
          overflow: hidden;
          .type {
            float: left;
            padding-left: 20px;
          }
        }
      }
    }

  }
  .movie-all{
    width: 1280px;
    margin: 20px auto;
    overflow: auto;
    .player {
      width: 900px;
      height: 600px;
      float: left;
    }
    .relative-area{
      width: 380px;
      height: 600px;
      float: left;
    }
  }
  .comment-details{
    .movie-tag{
      width: 1280px;
      margin: 0 auto;
    }
  }
}
</style>