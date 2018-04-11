<template>
  <section>
    <el-row class="content">
      <el-col :span="6" v-for="(value,key) in movies" :key="key" :offset="key % 4 === 0 ? 0 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="`http://uploads.kalecgos.top/${value.poster}`" class="image">
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
    display: flex;
    flex-flow: column wrap;
    width: 100%;
    height: 6000px;
  }
</style>