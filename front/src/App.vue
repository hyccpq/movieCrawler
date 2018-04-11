<template>
  <el-container>
    <el-header style="padding: 0">
      <my-nav></my-nav>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
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
      myNav
		},
		data(){
			return {
				sth:''
			}
		}
	}
</script>

<style>
  html *{
    padding: 0;
    margin: 0;
  }
</style>