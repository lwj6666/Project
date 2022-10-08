<template>
  <div ref="LineChart" class="LineChart"></div>
</template>
<script>
// 获取折线图相关数据信息
import { getphoneDailySales } from "../../api/index";

// 引入echarts
import * as echarts from "echarts";

export default {
  name: "HomeLineChart",
  data() {
    return {
      orderData: [],
    };
  },
  mounted() {
    getphoneDailySales().then(({ data }) => {
      this.orderData = data;

      // 基于准备好的dom，初始化echarts实例
      const echarts1 = echarts.init(this.$refs.LineChart);
      const echarts1Option = {};
      const phonesname = []; // 接收品牌名称数组
      const dateData = []; // 接收日期数组
      echarts1Option.series = [];
      this.orderData.forEach((item) => {
        // 获取品牌名称数组
        phonesname.push(item.name);
        // 获取日期数组
        if (!dateData.length) {
          item.sale_info.forEach((item) => {
            dateData.push(item.date);
          });
        }
        echarts1Option.series.push({
          name: item.name,
          data: item.sale_info.map((item) => {
            return item.sale;
          }),
          type: "line",
        });
      });
      echarts1Option.legend = {
        data: phonesname,
      };
      echarts1Option.xAxis = {
        data: dateData,
      };
      echarts1Option.yAxis ={}
      echarts1.setOption(echarts1Option);
    });
  },
};
</script>
<style lang="less" scoped>
.LineChart {
  height: 240px;
}
</style>