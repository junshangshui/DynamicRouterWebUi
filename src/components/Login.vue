<template>
  <div class="div1">
    <el-form ref='form' :model='account' :rules='rules' label-position='left' label-width='0px' class='demo-ruleForm login-container'>
      <h3 class='title'>登 录</h3>
      <el-form-item prop='username'>
        <el-input type='text' v-model='account.username' auto-complete='off' placeholder='账号'></el-input>
      </el-form-item>
      <el-form-item prop='password'>
        <el-input type='password' v-model='account.password' auto-complete='off' placeholder='密码'></el-input>
      </el-form-item>
      <el-form-item style='width:100%;'>
        <el-button type='primary' style='width:100%;' @click.native.prevent='doLogin' :loading='loading'>登录</el-button>
      </el-form-item>
      <label class="loginResultError">{{loginResultMessage}}</label>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      account: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      loginResultMessage: ''
    }
  },
  methods: {
    doLogin () {
      this.$refs.form.validate((valid) => {
        if (valid) { this.login() }
      })
    },
    login () {
      this.loading = true
      this.loginResultMessage = ''

      this.axios.post('/admin/login', JSON.stringify(this.account))
        .then((resp) => {
          this.loading = false
          if (resp.data) {
            if (resp.data.isLoginSuccess) {
              this.$store.commit('login', resp.data.message)
              let redirect = decodeURIComponent(this.$route.query.redirect || '/')
              this.$router.push({ path: redirect })
            } else {
              this.loginResultMessage = resp.data.message
            }
          }
        })
        .catch(error => {
          this.loading = false
          this.loginResultMessage = '登录失败' + error.message
        })
    }
  }
}
</script>
<style lang='scss' scoped>
.div1 {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -150px;
  width: 300px;
  height: 300px;
  .login-container {
    background-clip: padding-box;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #e4dfdf;
    .title {
      margin: 0px auto 30px auto;
      text-align: center;
      color: #505458;
    }
    .loginResultError {
      color: red;
      height: 26px;
    }
  }
}
</style>
