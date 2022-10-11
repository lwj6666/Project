<template>
  <div ref="Pie" class="Pie"></div>
</template>
<script>
// 获取接口数据
import { getxiaomiPhoneModelsPricedData } from "../../api/index";
// 引入echarts
import * as echarts from "echarts";

export default {
  name: "HomePieChart",
  data() {
    return {};
  },
  mounted() {
    getxiaomiPhoneModelsPricedData().then(({ data }) => {
      const echarts3 = echarts.init(this.$refs.Pie);
      const echarts3Option = {
        title: {
          text: "小米手机各型号定价",
        },
        tooltip: {},
        series: [
          {
            type: "pie",
            data: data,
          },
        ],
      };
      echarts3.setOption(echarts3Option);
    });
  },
};
</script>
<style lang="less">
.Pie {
  height: 260px;
}
</style>