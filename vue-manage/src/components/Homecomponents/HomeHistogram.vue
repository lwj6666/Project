<template>
  <div ref="histogram" class="histogram"></div>
</template>
<script>
// 获取接口数据
import { getactiveUserData } from "../../api/index";
// 引入echarts
import * as echarts from "echarts";

export default {
  name: "HomeHistogram",
  data() {
    return {
      userData: [],
    };
  },
  mounted() {
    getactiveUserData().then(({ data }) => {
      this.userData = data;

      // 基于准备好的dom，初始化echarts实例
      const echarts2 = echarts.init(this.$refs.histogram);
      const echarts2Option = {
        xAxis: {
          data: this.userData.map(item => item.date),
        },
        yAxis: {},
        tooltip: {},
        legend: {
          data: ["新用户", "活跃用户"],
        },
        series: [
          {
            name: "活跃用户",
            data: this.userData.map(item => item.activeuser),
            type: "bar",
            stack: "x",
          },
          {
            name: "新用户",
            data: this.userData.map(item => item.newuser),
            type: "bar",
            stack: "x",
          },
        ],
      };

      echarts2.setOption(echarts2Option);
    });
  },
};
</script>
<style lang="less">
.histogram{
    height: 260px;
}
</style>