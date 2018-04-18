<template>
<el-row class="tac">
  <el-col :span="24">
    <el-menu
      default-active="0"
      class="el-menu-vertical">
      <el-menu-item index="0">
        <span slot="title">全部</span>
      </el-menu-item>
      <el-menu-item v-for="(item, key) in movieTypes" :index="key+1+''" :key="key">
        <span slot="title">{{item}}</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
</template>

<script>
  import { Row, Col, Menu, MenuItem } from 'element-ui'
	export default {
		name: "asides",
    components:{
			elRow:Row,
      elCol:Col,
      elMenu:Menu,
      elMenuItem:MenuItem
    },
    props:{
			movieTypes: Array
    }
	}
</script>

<style scoped>
.tac{
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  overflow: auto;
}
</style>