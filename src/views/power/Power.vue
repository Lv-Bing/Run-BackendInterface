<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="userName"></el-table-column>
        <el-table-column label="密码" prop="userPassword"></el-table-column>
        <el-table-column label="用户积分" prop="userIntegral"></el-table-column>
        <el-table-column label="用户VIP" prop="userVIP"></el-table-column>
        <el-table-column label="userDistance" prop="userDistance"></el-table-column>
        <el-table-column label="userNickname" prop="userNickname"></el-table-column>
        <el-table-column label="用户删除" prop="userDelete"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.id)"
            ></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="setRole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.currentPage"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="addForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password" show-password></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb();
      }

      cb(new Error("请输入合法的邮箱"));
    };

    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

      if (regMobile.test(value)) {
        return cb();
      }

      cb(new Error("请输入合法的手机号"));
    };

    return {
      // 获取用户列表的参数对象
      queryInfo: {
        // query: "",
        // 当前的页数
        currentPage: 1,
        // 当前每页显示多少条数据
        pageSize: 20
      },
      userlist: [],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        name: "",
        password: ""
      },
      // 添加表单的验证规则对象
      addFormRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名的长度在3~10个字符之间",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "用户名的长度在6~15个字符之间",
            trigger: "blur"
          }
        ]
        // email: [
        //   { required: true, message: "请输入邮箱", trigger: "blur" },
        //   { validator: checkEmail, trigger: "blur" }
        // ],
        // mobile: [
        //   { required: true, message: "请输入手机号", trigger: "blur" },
        //   { validator: checkMobile, trigger: "blur" }
        // ]
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 查询到的用户信息对象
      editForm: {},
      // 修改表单的验证规则对象
      editFormRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          // {
          //   min: 3,
          //   max: 10,
          //   message: "用户名的长度在3~10个字符之间",
          //   trigger: "blur"
          // }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          // {
          //   min: 6,
          //   max: 15,
          //   message: "用户名的长度在6~15个字符之间",
          //   trigger: "blur"
          // }
        ]
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("GameUserQuery/Select", {
        params: this.queryInfo
      });
      console.log("res:", res);
      if (res.code !== 0) {
        return this.$message.error("获取用户列表失败！");
      }
      this.$message.success("获取用户列表成功");

      this.userlist = res.data.list;
    },
    // 监听 limit 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.limit = newSize;
      this.getUserList();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.page = newPage;
      this.getUserList();
    },

    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 点击按钮，添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return;
        // 可以发起添加用户的网络请求
        // console.log('shuju',this.addForm)
        const { data: res } = await this.$http.post(
          "GameUserAdd/Add?" +
            "userName=" +
            this.addForm.userName +
            "&password=" +
            this.addForm.password
        );

        if (res.code != 0) {
          this.$message.error("添加用户失败！");
        }
        this.$message.success("添加用户成功！");
        // 隐藏添加用户的对话框
        this.addDialogVisible = false;
        // 重新获取用户列表数据
        this.getUserList();
      });
    },
    // 展示编辑用户的对话框
    async showEditDialog(id) {
      // console.log(id)
      const { data: res } = await this.$http.get("/GameUserQuery/SelectById?id=" + id);
      if (res.code != 0) {
        return this.$message.error("查询用户信息失败！");
      }
      this.$message.success("查询用户信息成功");
      this.editForm = res.data.list[0];
      console.log("根据id查询数据", this.editForm);
      this.editDialogVisible = true;
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return;
        // 发起修改用户信息的数据请求
        const { data: res } = await this.$http.post(
          "GameUserUpdate/ById?id=" +
            this.editForm.id +
            "&userName=" +
            this.editForm.userName +
            "&userIntegral=" +
            this.editForm.userIntegral +
            "&userPassword=" +
            this.editForm.userPassword +
            "&userVIP=" +
            this.editForm.userVIP +
            "&userDistance=" +
            this.editForm.userDistance +
            "&userNickname=" +
            this.editForm.userNickname +
            "&signFrequency=" +
            this.editForm.signFrequency +
            "&strokeId=" +
            this.editForm.strokeId +
            "&termToken=" +
            this.editForm.termToken +
            "&termType=" +
            this.editForm.termType
        );
        
        if (res.code!= 0) {
          return this.$message.error("更新用户信息失败！");
        }
        // 提示修改成功
        this.$message.success("更新用户信息成功！");

        // 关闭对话框
        this.editDialogVisible = false;
        // 刷新数据列表
        this.getUserList();
      });
    },
    // 根据Id删除对应的用户信息
    async removeUserById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);

      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }

      const { data: res } = await this.$http.post("GameUserDelete/ById?id=" + id);

      if (res.code !== 0) {
        return this.$message.error("删除用户失败！");
      }
      this.$message.success("删除用户成功！");
      this.getUserList();
    },
    // 展示分配角色的对话框
    async setRole(userInfo) {
      this.userInfo = userInfo;

      // 在展示对话框之前，获取所有角色的列表
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status !== 200) {
        return this.$message.error("获取角色列表失败！");
      }

      this.rolesList = res.data;

      this.setRoleDialogVisible = true;
    },
    // 点击按钮，分配角色
    async saveRoleInfo() {
      if (!this.selectedRoleId) {
        return this.$message.error("请选择要分配的角色！");
      }

      const { data: res } = await this.$http.put(
        `users/${this.userInfo.id}/role`,
        {
          rid: this.selectedRoleId
        }
      );

      if (res.meta.status !== 200) {
        return this.$message.error("更新角色失败！");
      }

      this.$message.success("更新角色成功！");
      this.getUserList();
      this.setRoleDialogVisible = false;
    },
    // 监听分配角色对话框的关闭事件
    setRoleDialogClosed() {
      this.selectedRoleId = "";
      this.userInfo = {};
    }
  }
};
</script>

<style>
</style>

