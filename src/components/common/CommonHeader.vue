<template>
  <el-row>
    <el-col :span="12">
      <div class="title-label">翻转课堂管理平台</div>
    </el-col>
    <el-col :offset="11" :span="1">
      <el-button
        type="text"
        class="iconfont icon-guanji blue-text title-label"
        @click.native.prevent="logOut"
      ></el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    logOut() {
      this.$router.push('/login')
    }
  }
}
</script>
