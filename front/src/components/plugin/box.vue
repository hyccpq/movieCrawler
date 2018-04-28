<template>
  <div class="all-dialog">
    <div class="dialog-shade" @click="close" v-if="isShowLog"></div>
    <transition name="drop">
      <section class="block" v-show="isShowLog">
        <slot></slot>
      </section>
    </transition>
  </div>
</template>

<script>
	export default {
		name: "box",
    props: {
			isShowLog: {
				type: Boolean,
        default: false
      }
    },
    methods: {
			close(){
				this.$emit('onChange')
      }
    }
	}
</script>

<style scoped>
.drop-enter, .drop-leave-to{
  transform: scale(.3);
  opacity: 0;
}

.drop-enter-active, .drop-leave-active{
  transition: all .4s ease;
}

.all-dialog{
  /*position: relative;*/
}

.dialog-shade {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: .3;
  z-index: 5;
  background: #000;
}
.block {
  width: 800px;
  min-height: 400px;
  position: fixed;
  max-height: 50%;
  overflow: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 10;
  background-color: #fff;
  border-radius: 5px;
}

</style>