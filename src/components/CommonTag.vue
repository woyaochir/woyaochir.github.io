<template>
  <div class="tags"> 
    <el-tag 
        v-for="(item, index) in tags" 
        :key="item.path"
        :closable="item.name !== 'home'"
        :effect="$route.name === item.name ? 'dark': 'plain' "
        @click="changeMenu(item)"
        @close="handleClose(item, index)"
        size="small">
        {{ item.label }}
  </el-tag>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
  export default {
    name: 'CommonTag',
    data() {
      return {}
    },
    computed: {
      ...mapState({
          tags: state => state.tab.tabList
      })
    },
    methods: {
      ...mapMutations(['closeTag']),
      // 点击tag的跳转功能
      changeMenu(item) {
        this.$router.push({ name: item.name })
      },
      // 点击tag删除的功能
      handleClose(item, index) {
        // 调用store中的mutations
        this.closeTag(item)
        const length = this.tags.length  // 这里的length获取的是删除之后的数据
        // 删除之后的跳转逻辑(使高亮移动)
        if(item.name !== this.$route.name) {  // 点击删除的标签 和当前的页面路由不一致时
          return
        }
        if(index === length) { // 表示删除的是最后一个   比如说有三个元素 你点击了删除按钮  获取的索引是2  但是length是删除之后的数据 所以也是2
          this.$router.push({
            name: this.tags[index - 1].name
          }) 
        } else {
          this.$router.push({
            name: this.tags[index].name
          }) 
        }
      }
    }
  }
</script>
<style lang="less" scoped>
.tags {
  padding: 20px;
  padding-bottom: 0;
  .el-tag {
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>