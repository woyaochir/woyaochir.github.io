<template>
  <div> 
    <el-container>
      <el-aside width="auto">
        <common-aside/>
      </el-aside>
        <el-container>
          <el-header>
            <common-header/>
          </el-header>
          <common-tag/>
          <el-main><router-view></router-view> <!-- 子组件的路由出口在main里 --></el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTag from '../components/CommonTag.vue'
export default {
  data () {
    return {} 
  },
  components:{
    CommonAside,
    CommonHeader,
    CommonTag
  }
}
</script>
<style>
.el-header { /* 默认有padding */
  padding: 0;
}
</style>