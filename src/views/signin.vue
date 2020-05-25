<template>
  <div class="signin-container">
    <h3 class="signin-title">欢迎登录</h3>
    <el-form ref="form" :model="form">
      <el-form-item prop="name" required>
        <el-input type="text" v-model="form.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password" required>
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { sign_in } from '../api/auth';

  export default {
    name: 'WxSignin',
    data() {
      return {
        form: {
          name: 'admin',
          password: '123456'
        }
      }
    },
    methods: {
      onSubmit() {
        this.$refs['form'].validate(valid => {
          if(valid) {
            sign_in(this.form)
            .then(res => {
              this.$message.success(res.message);
              sessionStorage.setItem('token', res.data.token);
              console.log(sessionStorage.getItem('token'))
              this.$router.push('/todoList');
            })
            .catch(err => {
              this.$message.error(err.message || 'request error.');
              sessionStorage.removeItem('token');
            });
          }
        });
      }
    }
  }
</script>

<style lang="scss">
  .signin-container {
    max-width: 360px;
    margin: 0 auto;

    .el-button {
      display: block;
      width: 100%;
    }
  }

  .signin-title {
    margin-bottom: 20px;
    text-align: center;
    font-size: 28px;
    font-weight: 600;
  }
</style>