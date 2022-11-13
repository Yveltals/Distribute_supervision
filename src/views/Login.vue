<template>
  <div class="login">
    <div class="page-holder">
      <div class="row">
        <div class="mb">
          <div><img src="../assets/login.png" alt="" class="img"></div>
        </div>
        <div class="px">
          <h1 class="text">The Best Emotion</h1>
          <h2 style="color:#66696d;">分布式机群监管系统</h2>
          <el-form style="margin-top: 40px;" ref="loginForm" :rules="rules" :model="loginForm" label-width="60px">
            <el-form-item label="账号:" prop="username">
              <el-input style="width:300px" type="text" v-model="loginForm.username" auto-complete="off"
                placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input style="width:300px" type="password" v-model="loginForm.password" auto-complete="off"
                placeholder="请输入密码"></el-input>
            </el-form-item>
            <div style="margin-top:20px;">
              <el-button type="primary" style="margin-left:10px;width:50%" @click="submitLogin">登录</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username:[{required:true,message:'请输入账号',trigger:'blur'}],
        password:[{required:true,message: '请输入密码',trigger:'blur'}],
      },
    }
  },
  methods: {
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$message.success("登录成功");
          this.$router.replace("/admins/info")
        } else {
          this.$message.error("账号和密码不能为空！");
          return false;
        }
      })
    }
  },
}
</script>



<style scoped>
.page-holder {
  overflow-x: hidden;
  min-height: calc(100vh - 72px);
  display: flex !important;
  align-items: center !important;
}

.row {
  display: flex;
  flex-wrap: wrap;
  padding-top: 3rem !important;
  padding-bottom: 3rem !important;
  align-items: center !important;
}

.mb {
  width: 100%;
  margin-left: auto !important;
  margin-right: 40px;
  flex: 0 0 40%;
  max-width: 40%;
  margin-bottom: 3rem !important;
  margin-bottom: 0 !important;
}

.px {
  flex: 0 0 40%;
  max-width: 40%;
}

.text {
  color: #4680ff;
  font-size: 0.9rem !important;
  margin-bottom: 3px !important;
}

.img {
  max-width: 85%;
  height: auto;
}

.login {
  background-color: aliceblue;
  height: 100%
}

h1,h2,h3 {
  margin-bottom: 0.5rem;
  font-family: "Poppins", sans-serif;
  font-weight: 800;
  line-height: 1.2;
  color: inherit;
}

h1 {
  font-size: 2.25rem;
}

h2 {
  font-size: 1.8rem;
}
h3 {
  font-size: 1.2rem;
}

</style>