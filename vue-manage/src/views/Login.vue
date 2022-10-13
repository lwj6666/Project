<template>
  <el-form :model="form" :rules="rules">
    <h3 class="login_title">系统登录</h3>
    <el-form-item>
      <el-input v-model="form.username"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
};
</script>
<style lang="less" scoped>
</style>