<template>
  <el-container>
    <el-aside width='auto'>
        <CommentAside></CommentAside>
    </el-aside>
    <el-container>
      <el-header>
        <CommentHeader></CommentHeader>
      </el-header>

      <el-main>
        <CommonTag></CommonTag>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommentAside from '../components/CommonAside.vue'
import CommentHeader from '../components/CommonHeader.vue'
import CommonTag from '../components/CommonTag.vue'

export default {
    data() {
        return {
            
        }
    },
    components:{
        CommentAside,
        CommentHeader,
        CommonTag
    }
};
</script>
<style lang="less">
    .el-container{
        height: 100%;
    }

    .el-header{
      background-color: #333;
    }
</style>
