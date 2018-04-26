<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>相关影片</span>
    </div>
    <div class="text-item">
      <ul>
        <li v-for="movie in relativeMovie" class="movie-list">
          <div class="movie-item">
            <img class="cover-min" :src="'http://uploads.kalecgos.top/'+ movie.coverKey" alt="">
            <div class="info">
              <p class="title">{{ movie.title }}</p>
              <time class="time">{{ movie.meta.updatedAt }}</time>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </el-card>
</template>

<script>
  import { card } from 'element-ui'
	export default {
		name: "relative",
    components:{
			elCard:card
    },
    props:{
			relativeMovie:Array
    }
	}
</script>

<style scoped lang="less">
.box-card{
  .clearfix{
    font-size: 1.1em;
    font-weight: bold;
  }
  .text-item{
    height: 536px;
    overflow: auto;
    .movie-list{
      .movie-item {
        margin: 20px;
        height: 60px;
        overflow: hidden;
        .cover-min{
          width: 80px;
          height: 60px;
          float: left;
        }
        .info{
          width: 240px;
          float: left;
          padding-left: 10px;
          .title{
            height: 40px;
            line-height: 20px;
          }
          .time{
            color: #949482;
            font-size: 0.8rem;
          }
        }
      }
    }

  }
}
</style>