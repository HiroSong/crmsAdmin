<template>
  <el-container>
    <el-header class="header">
      <common-header></common-header>
    </el-header>
    <el-container>
      <el-aside width="15vw">
        <common-aside></common-aside>
      </el-aside>
      <el-main class="main-gap">
        <title-card>创建教师用户</title-card>
        <el-card shadow="hover" class="normal-gap" style="height: 70vh;">
          <el-row type="flex" justify="center" class="big-gap">
            <el-col :span="12">
              <el-form ref="teacherDataForm" :model="form" label-width="10vw" :rules="rules">
                <el-form-item label="教师姓名" prop="name">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="教工号" prop="username">
                  <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email">
                  <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="初始密码" prop="password">
                  <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" plain @click.native.prevent="onSubmit">提交</el-button>
                  <el-button plain @click.native.prevent="back">取消</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-card>
        <el-dialog title="提示" :visible.sync="messageVisible" width="30vw" class="content-text">
          <span>{{message}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" plain @click.native.prevent="confirm">确定</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonHeader from '@/components/common/CommonHeader'
import CommonAside from '@/components/common/CommonAside'
import TitleCard from '@/components/common/TitleCard'

export default {
  name: 'CreateTeacher',
  components: {
    'common-header': CommonHeader,
    'common-aside': CommonAside,
    'title-card': TitleCard
  },
  data() {
    return {
      form: {
        name: '',
        username: '',
        email: '',
        password: '123456'
      },
      rules: {
        name: [{
          required: true, message: '请输入用户名', trigger: 'blur'
        }],
        username: [{
          required: true, message: '请输入教工号', trigger: 'blur'
        }],
        email: [{
          required: true, message: '请输入教师邮箱', trigger: 'blur'
        }, {
          type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']
        }],
        password: [{
          required: true, message: '请输入密码', trigger: 'blur'
        }, {
          min: 6, message: '密码长度不得小于6', trigger: blur
        }]
      },
      message: undefined,
      messageVisible: false
    }
  },
  methods: {
    onSubmit() {
      this.$refs.teacherDataForm.validate((valid) => {
        if (valid) {
          this.$http.post('/teacher', this.form).then(
            response => {
              this.message = '您已成功创建一个账号！'
              this.messageVisible = true
            }).catch(error => {
              this.message = error.message
              this.messageVisible = true
            })
        }
      })
    },
    back() {
      this.$router.back()
    },
    confirm() {
      this.messageVisible = false
      this.$router.back()
    }
  }
}
</script>
