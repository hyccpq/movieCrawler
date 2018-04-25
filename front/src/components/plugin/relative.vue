<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>相关影片</span>
  </div>
  <div class="text item">
    <ul class="movie-list">
      <li v-for="movie in relativeMovie">{{ movie.title }}</li>
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

<style scoped>

</style>