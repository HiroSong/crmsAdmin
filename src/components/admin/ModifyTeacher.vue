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
        <title-card>修改教师信息</title-card>
        <el-card shadow="hover" class="normal-gap" style="height: 70vh;">
          <el-row type="flex" justify="center" class="big-gap">
            <el-col :span="12">
              <el-form ref="teacherInfoForm" :model="form" :rules="rules" label-width="10vw">
                <el-form-item label="教师姓名" prop="name">
                  <el-input v-model="form.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="教工号" prop="username">
                  <el-input v-model="form.username" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email">
                  <el-input v-model="form.email"></el-input>
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
  name: 'ModifyTeacher',
  components: {
    'common-header': CommonHeader,
    'common-aside': CommonAside,
    'title-card': TitleCard
  },
  data() {
    return {
      form: undefined,
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
        }]
      },
      message: undefined,
      messageVisible: false
    }
  },
  computed: {
    teacherID() {
      return this.$route.query.teacherID
    }
  },
  methods: {
    onSubmit() {
      this.$refs.teacherInfoForm.validate((valid) => {
        if (valid) {
          this.$http.put('/teacher/' + this.teacherID + '/information', this.form).then(
            response => {
              this.message = '您的修改已完成！'
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
  },
  created() {
    this.$http.get('/teacher/' + this.teacherID).then(
      response => {
        this.form = response
      }).catch(error => {
        this.message = error.message
        this.messageVisible = true
      })
  }
}
</script>
