<template>
  <div>
    <input type="text" v-model="sth">{{ sth }}
    <router-link to="/detail/1">6666</router-link>
    <router-view/>
  </div>
</template>

<script>
	export default {
		name: "App",
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