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
        <title-card>学生信息管理</title-card>
        <el-card shadow="hover" class="normal-gap">
          <el-row>
            <el-col :span="12">
              <i class="el-icon-search el-input__icon"></i>
              <el-autocomplete
                v-model="queryString"
                :fetch-suggestions="querySearch"
                placeholder="请输入学号"
                :clearable="true"
                :trigger-on-focus="false"
                @select="handleSelect"
                @clear="clearSearch"
              >
                <template slot-scope="{ item }">
                  <div>{{ item.name }}</div>
                  <div class="tip-text text-end">{{ item.account }}</div>
                </template>
              </el-autocomplete>
            </el-col>
            <el-col :span="12">
              <el-button plain class="end" @click.native.prevent="searchHandler">搜索</el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow="hover" class="normal-gap">
          <div slot="header">
            <span class="title-text">学生列表</span>
            <el-row class="content-text bold-text text-center small-gap">
              <el-col :span="6">学号</el-col>
              <el-col :span="6">姓名</el-col>
              <el-col :span="6">电子邮箱</el-col>
            </el-row>
          </div>
          <div style="height: 35vh;">
            <el-scrollbar style="height:100%;">
              <el-table :data="filtedTable" :show-header="false" row-class-name="content-text">
                <el-table-column prop="account" style="width: 25%" align="center"></el-table-column>
                <el-table-column prop="name" style="width: 25%" align="center"></el-table-column>
                <el-table-column prop="email" style="width: 25%" align="center"></el-table-column>
                <el-table-column fixed="right" style="width: 25%" align="center">
                  <template slot-scope="scope">
                    <el-row type="flex" justify="center">
                      <el-button
                        plain
                        class="el-icon-edit-outline"
                        size="small"
                        @click.native.prevent="modifyStudent(scope.row.id)"
                      ></el-button>
                      <el-button
                        plain
                        class="el-icon-refresh"
                        size="small"
                        @click.native.prevent="resetStudent(scope.row.id)"
                      ></el-button>
                      <el-button
                        plain
                        class="el-icon-delete"
                        size="small"
                        @click.native.prevent="deleteStudent(scope.row.id)"
                      ></el-button>
                    </el-row>
                  </template>
                </el-table-column>
              </el-table>
            </el-scrollbar>
          </div>
        </el-card>
        <el-dialog
          :title="dialogTitle"
          :visible.sync="dialogVisible"
          width="30vw"
          class="content-text"
        >
          <span>{{message}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" plain @click.native.prevent="confirm">确 定</el-button>
            <el-button plain @click.native.prevent="dialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="messageVisible" width="30vw" class="content-text">
          <span>{{message}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" plain @click.native.prevent="messageVisible = false">确定</el-button>
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
  name: 'TeacherInfo',
  components: {
    'common-header': CommonHeader,
    'common-aside': CommonAside,
    'title-card': TitleCard
  },
  data() {
    return {
      studentList: undefined,
      queryString: undefined,
      dialogTitle: undefined,
      dialogVisible: false,
      message: undefined,
      confirm: undefined,
      messageVisible: false,
      needFliter: false,
      selectedItem: undefined,
      sortedTable: undefined
    }
  },
  computed: {
    filtedTable() {
      return this.sortedTable
    }
  },
  methods: {
    updateData() {
      if (this.needFliter) {
        if (this.selectedItem === undefined) {
          this.sortedTable = this.queryString ? this.studentList.filter(this.createFilter(this.queryString)) : this.studentList
        } else {
          this.sortedTable = this.studentList.filter(this.selectFliter(this.selectedItem))
        }
      } else {
        this.sortedTable = this.studentList
      }
    },
    querySearch(queryString, cb) {
      var studentList = this.studentList
      var results = this.queryString ? studentList.filter(this.createFilter(queryString)) : this.studentList
      cb(results)
    },
    createFilter(queryString) {
      return (student) => {
        return student.account.toLowerCase().match(queryString.toLowerCase()) !== null
      }
    },
    selectFliter(queryString) {
      return (student) => {
        return student.account.toLowerCase() === queryString.account.toLowerCase()
      }
    },
    handleSelect(item) {
      this.queryString = item.name
      this.selectedItem = item
      this.needFliter = true
      this.updateData()
    },
    clearSearch() {
      this.selectedItem = undefined
      this.needFliter = false
      this.updateData()
    },
    searchHandler() {
      this.selectedItem = undefined
      this.needFliter = true
      this.updateData()
    },
    modifyStudent(id) {
      this.$router.push({ path: '/students/modify', query: { studentID: id } })
    },
    deleteStudent(id) {
      this.dialogTitle = '删除账号'
      this.message = '您确定要删除这个账号吗？'
      this.dialogVisible = true
      this.confirm = () => {
        this.dialogVisible = false
        this.$http.delete('/student/' + id).then(() => {
          this.$http.get('/student').then(
            response => {
              this.studentList = response
              this.updateData()
              this.confirm = () => this.messageVisible = false
              this.message = '删除成功'
              this.messageVisible = true
            }).catch(error => {
              this.message = error.message
              this.messageVisible = true
            })
        }).catch(error => {
          this.message = error.message
          this.messageVisible = true
        })
      }
    },
    successInfo() {
      this.message = '您已重置该账号的密码,账号初始密码为 123456'
      this.messageVisible = true
    },
    resetStudent(id) {
      this.dialogTitle = '修改账号'
      this.message = '您确定要重置该账号的密码吗？'
      this.dialogVisible = true
      this.confirm = () => {
        this.dialogVisible = false
        this.$http.put('/student/' + id + '/password').then(() => {
          this.successInfo()
          this.confirm = () => this.messageVisible = false
        }).catch(error => {
          this.message = error.message
          this.messageVisible = true
        })
      }
    }
  },
  created() {
    this.$http.get('/student').then(
      response => {
        this.studentList = response
        this.updateData()
      }).catch(error => {
        this.message = error.message
        this.messageVisible = true
      })
  }
}
</script>
