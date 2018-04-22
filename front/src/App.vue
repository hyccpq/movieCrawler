<template>
  <el-container>
    <el-header style="padding: 0">
      <my-nav></my-nav>
    </el-header>
    <el-container>
      <my-aside :movieTypes="types"></my-aside>
      <el-container class="right-content">
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <el-footer>@2018 Kalec的电影小站</el-footer>
  </el-container>
</template>

<script>
  import { mapState } from 'vuex'
  import aside from './components/plugin/aside'
  import {
  	Container,
    Header,
    Aside,
    Main,
    Footer
  } from 'element-ui'
  import myNav from './components/plugin/nav'
	export default {
		name: "App",
		components:{
			elContainer: Container,
			elHeader: Header,
			elAside: Aside,
			elMain: Main,
			elFooter: Footer,
      myNav,
      myAside:aside
		},
		data(){
			return {
				sth:''
			}
		},
    computed:{
      ...mapState({
        types: state => state.movieTypes
      })
    },
    beforeMount(){
			this.$store.dispatch('getMoviesList')
      this.$store.dispatch('getMoviesTypes')
    }
	}
</script>

<style>
  html *{
    padding: 0;
    margin: 0;
  }
  a{
    text-decoration:none;
    color:#333;
  }
  .right-content {
    padding-left: 68px;
  }
</style>