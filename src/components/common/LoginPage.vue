<template>
  <el-container>
    <el-header class="header">
      <login-header></login-header>
    </el-header>
    <el-main class="top">
      <el-row type="flex" justify="center">
        <div class="title-text bold-text">翻转课堂管理员登录</div>
      </el-row>
      <el-form ref="loginForm" :model="form" :rules="rules">
        <el-row type="flex" justify="center" class="normal-gap">
          <el-col :span="5">
            <el-form-item prop="username">
              <el-input
                class="content-text"
                placeholder="请输入用户名"
                :clearable="true"
                v-model="form.username"
                autocomplete="on"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" class="normal-gap">
          <el-col :span="5">
            <el-form-item prop="password">
              <el-input
                class="content-text"
                placeholder="请输入密码"
                type="password"
                :clearable="true"
                v-model="form.password"
                autocomplete="on"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" class="normal-gap">
          <el-col :span="2">
            <el-form-item>
              <el-button
                class="full-width text-center"
                type="primary"
                @click.native.prevent="login"
              >登录</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-dialog title="提示" :visible.sync="dialogVisible" class="content-text">
        <span>{{dialogMessage}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click.native.prevent="dialogVisible = false">确定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import LoginHeader from '@/components/common/LoginHeader'

export default {
  name: 'LoginPage',
  components: {
    'login-header': LoginHeader
  },
  data() {
    return {
      form: {
        username: undefined,
        password: undefined
      },
      dialogVisible: false,
      dialogMessage: undefined,
      rules: {
        username: [{
          required: true, message: '请输入用户名', trigger: 'blur'
        }],
        password: [{
          required: true, message: '请输入密码', trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$http.post('/user/login',
            {
              username: this.form.username,
              password: this.form.password
            }).then(response => {
              this.$store.commit('SET_AUTH', response)
              this.$router.push({ path: '/teachers' })
            }).catch(error => {
              this.dialogMessage = error.message
              this.dialogVisible = true
            })
        }
      });

    }
  }
};
</script>