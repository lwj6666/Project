<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录的时间：<span>xxx</span></p>
          <p>上次登录的地点：<span>xxx</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="margin-top: 20px">
        <el-table :data="tableData" style="width: 100%">
          <!-- 这里可以vfor遍历 -->
          <el-table-column prop="name" label="产品名"> </el-table-column>
          <el-table-column prop="todayBuy" label="今日购买"> </el-table-column>
          <el-table-column prop="monthBuy" label="月购买"> </el-table-column>
          <el-table-column prop="totalBuy" label="总购买"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card
          shadow="always"
          v-for="item in countData"
          :key="item.name"
          :body-style="CardStyle"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ backgroundColor: `${item.color}` }"
          ></i>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      userImg: require("../../assets/logo.png"),
      tableData: [
        {
          name: "小米",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "红米",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "苹果",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "魅族",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
      ],
      countData: [
        {
          name: "今日支付订单",
          value: 123,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 123,
          icon: "star-on",
          color: "#ffb989",
        },
        {
          name: "今日未支付订单",
          value: 123,
          icon: "s-cooperation",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 123,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 123,
          icon: "star-on",
          color: "#ffb989",
        },
        {
          name: "本月未支付订单",
          value: 123,
          icon: "s-cooperation",
          color: "#5ab1ef",
        },
      ],
      // card样式
      CardStyle: {
        display: "flex",
        alignItems: "center",
        padding: "0px"
      },
    };
  },
};
</script>
<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }

  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .access {
      color: #999999;
    }
  }
}
.login-info {
  margin-top: 20px;
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content:space-between;

  .el-card{
    width: 32%;
    margin-bottom: 20px;
  }

  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 40px;
    }
    .desc {
      font-size: 14px;
      text-align: center;
      color: #999999;
    }
  }
}
</style>