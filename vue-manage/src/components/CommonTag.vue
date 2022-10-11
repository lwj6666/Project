<template>
  <div class="tags">
    <el-tag
      v-for="(item, index) in tabsList"
      :key="item.path"
      :closable="item.name !== 'Home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @close="handleClose(item, index)"
      @click="changeMenu(item)"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState("pageControlAbout", ["tabsList"]),
  },
  methods: {
    ...mapMutations("pageControlAbout", ["closeTab"]),

    // 点击tag跳转功能
    changeMenu(item) {
      this.$router.push({
        name: item.name,
      });
    },
    // 点击tag删除功能
    handleClose(item, index) {
      // 调用store中的mutations
      this.closeTab(index); //2
      let length = this.tabsList.length; //2
      // 删除之后的跳转逻辑
      //避免重复开启一个页面
      if (this.$route.name !== item.name) {
        return;
      }
      //判断中间关闭还是最后关闭
      if (index === length) {
        this.$router.push({
          name: this.tabsList[index - 1].name,
        });
      } else {
        this.$router.push({
          name: this.tabsList[index].name,
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.tags {
  margin-bottom: 20px;

  .el-tag {
    cursor: pointer;
    margin-right: 10px;
  }
}
</style>