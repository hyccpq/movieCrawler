<template>
  <section>
    <el-row class="content">
      <el-col v-for="(value,key) in movies" :key="key" class="content-item">
        <el-card :body-style="{ padding: '0px' }">
          <a href="javascript:void(0)" @click.prevent="playerVideo(value.coverKey, value.videoKey)"><img
            :src="`http://uploads.kalecgos.top/${value.poster}?
imageMogr2/auto-orient/thumbnail/540x800!/blur/1x0/quality/75|imageslim`"
            class="image"></a>
          <div style="padding: 14px;">
            <h2>{{ value.rawTitle }}</h2>
            <p>{{ value.summary }}</p>
            <div class="bottom clearfix">
              <time class="time">{{ localTime(value.meta.updatedAt) }}</time>
              <el-button type="text" class="button">查看详细</el-button>
              <div><span>豆瓣评分：</span>{{ value.rate }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <my-box :isShowLog="isShowVideoPlayer" @onChange="changeVideo">
      <myplayer ref="myplayer"></myplayer>
    </my-box>
  </section>
</template>

<script>
  import myplayer from './plugin/player'
  import myBox from './plugin/box'
  import {
  	Col,
    Card,
    Row,
    Button
  } from 'element-ui'
  import { mapState ,mapActions } from 'vuex'
	export default {
		name: "home",
    components:{
			elCol: Col,
      elCard: Card,
      elRow: Row,
      elButton: Button,
      myplayer,
      myBox
    },
    data() {
			return {
				currentDate: new Date(),
        opt: {

        },
        isShowVideoPlayer: false
        // movies: []
      }
    },
    computed:{
      ...mapState({
        movies: state => state.movies.movies
      })
    },
    methods: {
			localTime(UTCtime){
				let date = new Date(UTCtime)
        let localTime = date.toLocaleString()
        return localTime
      },
      playerVideo(img, video){
        this.opt = {
        	video:{
		        url: 'http://uploads.kalecgos.top/' + video,
		        pic: 'http://uploads.kalecgos.top/' + img
          }
        }
        this.$refs.myplayer.showVideoPlayer(this.opt)
        this.changeVideo();
      },
      changeVideo(){
				if(this.isShowVideoPlayer){
					this.isShowVideoPlayer = false
          this.opt = {}
          this.$refs.myplayer.showVideoPlayer(this.opt)
        } else {
					setTimeout(()=>{
						this.isShowVideoPlayer = true
					},1000)
        }
      }
    }
	}
</script>

<style scoped>

  .content{
    column-width: 360px;
    overflow: hidden;
  }

  .content-item {
    width: 360px;
    height: auto;
    padding: 5px;
    display: block;
    overflow: hidden;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }

  .content {

  }
</style>