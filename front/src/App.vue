<template>
  <el-container>
    <my-nav></my-nav>
    <el-header>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main>Main</el-main>
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
  import nav from './components/plugin/nav'
	export default {
		name: "App",
		components:{
			elContainer: Container,
			elHeader: Header,
			elAside: Aside,
			elMain: Main,
			elFooter: Footer,
      myNav: nav
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