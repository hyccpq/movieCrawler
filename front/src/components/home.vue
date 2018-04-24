<template>
  <section>
    <el-row class="content">
      <el-col v-for="(value,key) in movies" :key="key" class="content-item">
        <el-card :body-style="{ padding: '0px' }">
          <a href="javascript:void(0)" @click.prevent="playerVideo(value.coverKey, value.videoKey)"><img
            :src="`http://uploads.kalecgos.top/${value.poster}?
imageMogr2/auto-orient/thumbnail/540x800!/blur/1x0/quality/75|imageslim`"
            class="image"></a>

          <div style="padding: 14px;" class="content-section">
            <div class="summery">
              <router-link :to="`/detail/${value._id}`">
                <h2 class="title">{{ value.rawTitle }}</h2>
              </router-link>
              <p>{{ value.summary }}</p>
            </div>
            <div class="bottom clearfix content-item-little">
              <time class="time">{{ localTime(value.meta.updatedAt) }}</time>
              <router-link :to="`/detail/${value._id}`">
                <el-button type="text" class="button">查看详细</el-button>
              </router-link>
              <div class="douban-rate"><span>豆瓣评分：</span>{{ value.rate }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <my-box :isShowLog="isShowVideoPlayer" @onChange="changeVideo">
      <myplayer ref="myplayer" :option="opt"></myplayer>
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
        opt: {},
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
        this.changeVideo();
      },
      changeVideo(){
				if(this.isShowVideoPlayer){
					this.isShowVideoPlayer = false
          this.opt = {}
        } else {
					setTimeout(()=>{
						this.isShowVideoPlayer = true
					},1000)
        }
      }
    }
	}
</script>

<style scoped lang="less">

  .content-item {
    width: 20%;
    /*height: 900px;*/
    padding: 0;
    display: block;
    overflow: hidden;

    .content-section {
      height: 341px;
      min-height: 341px;

      .summery {
        height: 298px;
        overflow: hidden;
      }

      .content-item-little {
        height: 30px;

        .douban-rate {
          margin: 6px auto;
        }
      }
    }
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