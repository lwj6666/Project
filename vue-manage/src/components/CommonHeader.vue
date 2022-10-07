<template>
  <header>
    <div class="l-content">
      <el-button plain icon="el-icon-menu" size="mini" @click="isCollapseChange()"></el-button>
      <h3>首页</h3>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img class="userImg" :src="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">个人中心</el-dropdown-item>
          <el-dropdown-item command="b">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "CommonHeader",
  data() {
    return {
      userImg: require("../assets/logo.png"),
    };
  },
  methods: {
    ...mapMutations('pageControlAbout',['isCollapseChange'])
  },
};
</script>

<style lang="less">
header {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  .l-content{
    display: flex;
    align-items: center;

    .el-button{
        margin-right: 20px;
    }
  }
  .r-content{
    .userImg{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
  }
}
</style>