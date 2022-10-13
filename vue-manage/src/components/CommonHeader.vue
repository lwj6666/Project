<template>
  <header>
    <div class="l-content">
      <el-button
        plain
        icon="el-icon-menu"
        size="mini"
        @click="isCollapseChange()"
      ></el-button>

      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tabsList"
          :key="item.name"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
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
import { mapMutations, mapState } from "vuex";
export default {
  name: "CommonHeader",
  data() {
    return {
      userImg: require("../assets/logo.png"),
    };
  },
  methods: {
    // 控制侧边栏伸缩
    ...mapMutations("pageControlAbout", ["isCollapseChange"]),
  },
  computed: {
    ...mapState("pageControlAbout", ["tabsList"]),
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  .l-content {
    display: flex;
    align-items: center;

    .el-button {
      margin-right: 20px;
    }

    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: normal;
        &.is-link {
          color: #666;
        }
      }

      &:last-child{
        .el-breadcrumb__inner{
          color: #fff;
        }
      }
    }
  }
  .r-content {
    .userImg {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>