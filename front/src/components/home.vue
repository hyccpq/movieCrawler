<template>
  <section>
    <el-row class="content">
      <el-col v-for="(value,key) in movies" :key="key" class="content-item">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="`http://uploads.kalecgos.top/${value.poster}?
imageMogr2/auto-orient/thumbnail/540x800!/blur/1x0/quality/75|imageslim`" class="image">
          <div style="padding: 14px;">
            <h2>{{ value.rawTitle }}</h2>
            <p>{{ value.summary }}</p>
            <div class="bottom clearfix">
              <time class="time">{{ localTime(value.meta.updatedAt) }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </section>
</template>

<script>
  import {
  	Col,
    Card,
    Row,
    Button
  } from 'element-ui'
  import $http from '../lib/axios'
	export default {
		name: "home",
    components:{
			elCol: Col,
      elCard: Card,
      elRow: Row,
      elButton: Button
    },
    data() {
			return {
				currentDate: new Date(),
        movies: []
      }
    },
    methods: {
			localTime(UTCtime){
				let date = new Date(UTCtime)
        let localTime = date.toLocaleString()
        return localTime
      }
    },
    beforeMount(){
			$http({
        method:'get',
        url: 'movies'
      }).then(res => {
      	this.movies = res.data.movies
      })
    }
	}
</script>

<style scoped>
  .content-item {
    width: 540px;
    height: auto;
    padding: 5px;
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