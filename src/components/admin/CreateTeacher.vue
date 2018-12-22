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
        <el-card shadow="hover" class="normal-gap">
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-form ref="form" :model="form" label-width="10vw">
                <el-form-item label="教师姓名">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="教工号">
                  <el-input v-model="form.number"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱">
                  <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="初始密码">
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
          <span>您已成功创建一个账号！</span>
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
        number: '',
        email: '',
        password: '123456'
      },
      messageVisible: false
    }
  },
  methods: {
    onSubmit() {
      // ajax请求
      this.messageVisible = true
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
