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
        <title-card>教师信息管理</title-card>
        <el-card shadow="hover" class="normal-gap">
          <el-row>
            <el-col :span="12">
              <i class="el-icon-search el-input__icon"></i>
              <el-autocomplete
                popper-class="my-autocomplete"
                v-model="queryString"
                :fetch-suggestions="querySearch"
                placeholder="请输入教工号/姓名"
                :trigger-on-focus="false"
                @select="handleSelect"
              >
                <template slot-scope="{ item }">
                  <div class="name">{{ item.value }}</div>
                  <span class="addr">{{ item.address }}</span>
                </template>
              </el-autocomplete>
            </el-col>
            <el-col :span="12">
              <el-button plain class="end">搜索</el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow="hover" class="normal-gap">
          <div slot="header">
            <span class="title-text">教师列表</span>
            <el-button
              class="iconfont icon-jia blue-text"
              style="float: right; padding: 0.2rem"
              size="small"
              circle
              @click.native.prevent="createTeacher"
            ></el-button>
            <el-row class="content-text bold-text text-center small-gap">
              <el-col :span="6">教工号</el-col>
              <el-col :span="6">姓名</el-col>
              <el-col :span="6">电子邮箱</el-col>
            </el-row>
          </div>
          <div style="height: 35vh;">
            <el-scrollbar style="height:100%;">
              <el-table :data="tableData" :show-header="false" row-class-name="content-text">
                <el-table-column prop="number" style="width: 25%" align="center"></el-table-column>
                <el-table-column prop="name" style="width: 25%" align="center"></el-table-column>
                <el-table-column prop="email" style="width: 25%" align="center"></el-table-column>
                <el-table-column fixed="right" style="width: 25%" align="center">
                  <template slot-scope="scope">
                    <el-row type="flex" justify="center">
                      <el-button
                        plain
                        class="el-icon-edit-outline"
                        size="small"
                        @click.native.prevent="modifyTeacher"
                      ></el-button>
                      <el-button
                        plain
                        class="el-icon-refresh"
                        size="small"
                        @click.native.prevent="resetTeacher"
                      ></el-button>
                      <el-button
                        plain
                        class="el-icon-delete"
                        size="small"
                        @click.native.prevent="deleteTeacher"
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
          <span>您已重置该账号的密码
            <br>账号初始密码为 123456
          </span>
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
      restaurants: [],
      queryString: '',
      tableData: [{
        number: '123456',
        name: '邱明',
        email: '123456@xmu.edu.cn'
      }],
      dialogTitle: '',
      dialogVisible: false,
      message: '',
      confirm: undefined,
      messageVisible: false
    }
  },
  methods: {
    querySearch(cb) {
      var restaurants = this.restaurants
      var results = this.queryString ? restaurants.filter(this.createFilter(queryString)) : this.restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter() {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(this.queryString.toLowerCase()) === 0)
      };
    },
    loadAll() {
      return [
        { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' }
      ]
    },
    handleSelect(item) {
      console.log(item)
    },
    createTeacher() {
      this.$router.push('/teachers/create')
    },
    modifyTeacher() {
      this.$router.push('/teachers/modify')
    },
    deleteTeacher() {
      this.dialogTitle = '删除账号'
      this.message = '您确定要删除这个账号吗？'
      this.dialogVisible = true
      this.confirm = function () {
        this.dialogVisible = false
        // ajax请求处理
      }
    },
    successInfo() {
      this.messageVisible = true
    },
    resetTeacher() {
      this.dialogTitle = '修改账号'
      this.message = '您确定要重置该账号的密码吗？'
      this.dialogVisible = true
      this.confirm = function () {
        this.dialogVisible = false
        // ajax请求处理
        this.successInfo()
      }
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
}
</script>
