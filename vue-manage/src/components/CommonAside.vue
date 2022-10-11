<template>
  <el-menu
    default-active="/home"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <h3>{{ isCollapse ? "后台" : "后台管理系统" }}</h3>
    <el-menu-item
      @click="clickMenu(item)"
      v-for="item in noChildren"
      :key="item.path"
      :index="item.path"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu v-for="item in hasChildren" :key="item.path" :index="item.path">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item
        v-for="children in item.children"
        :key="children.path"
        :index="children.path"
        >{{ children.label }}</el-menu-item
      >
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CommonAside",
  data() {
    return {
      menu: [
        {
          path: "/home",
          name: "Home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/mall",
          name: "Mall",
          label: "商品管理",
          icon: "goods",
          url: "MallManage/MallManage",
        },
        {
          path: "/user",
          name: "User",
          label: "用户管理",
          icon: "user",
          url: "UserManage/UserManage",
        },
        {
          path: "/other",
          label: "其他",
          icon: "position",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "首页1",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/page2",
              name: "page2",
              label: "首页2",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 编程式路由
    clickMenu(item) {
      // 路径不一致才开始跳转
      if (this.$route.path !== item.path) {
        this.$router.push({
          name: item.name,
        });

        this.$store.commit("pageControlAbout/selectMenu", item);
      }
    },
  },
  computed: {
    // 无children的(子选项)
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    // 有children的(子选项)
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
    //
    // subject(){
    //   return this.$store.state.pageControlAbout.isCollapse
    // }
    ...mapState("pageControlAbout", ["isCollapse"]),
  },
};
</script>

<style lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100%;
  border: 0;
  // background-color: #333;

  h3 {
    text-align: center;
    color: #fff;
    line-height: 40px;
  }
}
</style>