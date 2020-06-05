<template>
  <div>
    <div class="loading-wrapper" v-show="showLoading">
      <Loading></Loading>
    </div>
    <div class="login-wrapper" v-show="!showLoading">
      <img :src="imgUrl" alt width="100%" height="100%" />
      <div class="login">
        <p class="title">后台管理系统</p>
        <el-form
          :model="addForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="name">
            <el-input v-model="addForm.name" auto-complete="off" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="addForm.password"
              auto-complete="off"
              placeholder="输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login" style="width:100%;">登录</el-button>
            <p class="register" @click="gotoRegist">没有账户？立即注册</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import axios from "axios";
import Loading from "@/components/loading/Loading.vue";
export default {
  name: "Login",
  components: {
    Loading
  },
  data() {
    let checkName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      addForm: {
        name: "",
        password: ""
      },
      showLoading: true,
      imgUrl: require("../../assets/images/bg-img-1.jpg"),
      rules: {
        name: [{ validator: checkName, trigger: "change" }],
        password: [{ validator: validatePass, trigger: "change" }]
      }
    };
  },
  mounted() {
    let bgImg = new Image();
    bgImg.src = this.imgUrl;
    bgImg.onerror = () => {
      console.log("img onerror");
    };
    bgImg.onload = () => {
      // 图片加载成功后 去除loading
      this.showLoading = false;
    };
  },
  methods: {
    ...mapMutations({
      bindLogin: "BIND_LOGIN",
      saveUser: "SAVE_USER"
    }),
    login() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          await this.axios
            .post("/login/ToLogin", this.qs.stringify(this.addForm), {
              withCredentials: true,
              credentials: "include"
            })
            .then(res => {
              console.log(res);
              if (res.data.code !== 0) {
                return this.$message.error("失败");
              }
              this.$message.success("成功");
              window.sessionStorage.setItem("token", res.data.token);
              setTimeout(() => {
                this.$router.push({
                  path: "/users"
                });
              }, 500);
            });
        }
      });
    },
    gotoRegist() {
      this.$router.push({
        path: "/register"
      });
    }
  }
};
</script>
<style scoped>
.loading-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #aedff8;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
.login-wrapper img {
  position: absolute;
  z-index: 1;
}
.login {
  max-width: 340px;
  margin: 60px auto;
  background: #fff;
  padding: 20px 40px;
  border-radius: 10px;
  position: relative;
  z-index: 9;
}
.title {
  font-size: 26px;
  line-height: 50px;
  font-weight: bold;
  margin: 10px;
  text-align: center;
}
#login-form > input {
  width: 100%;
  height: 34px;
  display: block;
  margin-top: 26px;
  background: #fff;
  color: #333;
  border: 1px solid #7da9c7;
  outline: none;
  text-indent: 20px;
  font-size: 14px;
}
#login-form > button {
  width: 100%;
  height: 34px;
  display: block;
  margin-top: 26px;
  background: #1ab2ff;
  color: #fff;
  border: 1px solid #1ab2ff;
  outline: none;
  border-radius: 100px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}
.register {
  margin-top: 10px;
  font-size: 14px;
  line-height: 22px;
  text-indent: 8px;
  color: #1ab2ff;
  cursor: pointer;
  display: inline-block;
}
.register:hover {
  color: #2c2fd6;
}
@media (max-width: 768px) {
  .login {
    max-width: 260px;
    margin: 60px auto;
    background: #fff;
    padding: 20px 20px;
    border-radius: 10px;
    position: relative;
    z-index: 9;
  }
}
</style>
