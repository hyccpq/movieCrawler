<template>
  <div id="dplayer"></div>
</template>

<script>
  import 'dplayer/dist/DPlayer.min.css'
  import DPlayer from 'dplayer'
	export default {
		name: "player",
    data(){
			return {
				dp: null
      }
    },
    methods:{
			showVideoPlayer(opt){
				opt.container = document.getElementById('dplayer')
			  const player = this.dp = new DPlayer(opt)
      }
    },
    mounted(){

      // const events = player.events
      // Object.keys(events).forEach(item => {
      // 	if(item === 'events'){
      // 		return false
      //   } else {
      // 		events[item].forEach(event => {
      // 			player.on(event, () => {this.$emit(event)})
      //     })
      //   }
      // })
    }
	}
</script>

<style scoped>


</style>