<template>
  <div id="dplayer"></div>
</template>

<script>
  import 'dplayer/dist/DPlayer.min.css'
  import DPlayer from 'dplayer'
	export default {
		name: "player",
    props:{
			option:{
				default: {
					container: ''
        },
        type: Object
      }
    },
    data(){
			return {
				dp: null
      }
    },
    watch:{
			'option'(opt){
				this.showVideoPlayer(opt)
      }
    },
    methods:{
			showVideoPlayer(opt){
				opt.container = document.getElementById('dplayer')
			  const player = this.dp = new DPlayer(opt)
      }
    },
    mounted(){
      this.showVideoPlayer(this.option)
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