<template>
  <div class="manae">
    <el-dialog
      :title="modalType === 0 ? '新增用户' : '编辑用户'"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="40%"
    >
      <!-- 表单 -->
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
        :inline="true"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期" prop="brith">
          <el-date-picker
            v-model="form.brith"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="Cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <div class="manage-header">
      <el-button type="primary" @click="handleadd"> + 新增 </el-button>
      <el-table :data="usersData" style="width: 100%">
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="sex" label="性别"> </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column label="出生日期">
          <template slot-scope="scope">
            <span>{{ scope.row.brith.substring(0, 10) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              @click="handleDelete(scope.row)"
              type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getUsersData, addUserData, updateUserData } from "../../api/index";

export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        id:"",
        name: "",
        age: "",
        sex: "",
        brith: "",
        address: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        age: [
          {
            required: true,
            message: "请输入年龄",
            trigger: "blur",
          },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        brith: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        address: [
          {
            required: true,
            message: "请输入地址",
            trigger: "blur",
          },
        ],
      },
      usersData: [],
      modalType: 0, // 0表示新增的弹窗，1表示编辑的弹窗
    };
  },
  methods: {
    // 新增按钮事件
    handleadd() {
      this.dialogVisible = true;
      this.modalType = 0;
    },

    // 取消提交用户表单
    Cancel() {
      this.handleClose();
    },

    // 提交用户表单
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 后续对表单数据的处理
          if (this.modalType === 0) {
            // 添加用户，在更新数据
            addUserData(this.form).then(({ data }) => {
              console.log(data);
              this.updateList();
            });
          } else {
            // 更新用户
            console.log(this.form.age);
            console.log(this.form);
          }

          // 关闭弹窗
          this.handleClose();
        }
      });
    },

    // 弹窗关闭的时候重置form数据
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },

    handleEdit(row) {
      this.dialogVisible = true;
      this.modalType = 1;

      console.log(row);
      this.form = JSON.parse(JSON.stringify(row))
      console.log(this.form);
    },

    // 更新列表
    updateList() {
      getUsersData().then(({ data }) => {
        this.usersData = data;
      });
    },
  },
  mounted() {
    this.updateList();
  },
};
</script>
<style lang="less" scoped>
</style>