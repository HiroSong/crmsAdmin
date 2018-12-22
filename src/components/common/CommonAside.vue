<template>
  <el-menu :collapse="isCollapse" class="full-height side-bar" :router="true">
    <el-submenu>
      <i class="iconfont icon-wenjianjia"></i>
      <span class="title-text" slot="title">&nbsp;信息管理</span>
      <el-menu-item index="/teachers">
        <i class="iconfont icon-jiaoshi"></i>
        <span class="title-text" slot="title">&nbsp;管理教师信息</span>
      </el-menu-item>
      <el-menu-item index="/students">
        <i class="iconfont icon-xuesheng"></i>
        <span class="title-text" slot="title">&nbsp;管理学生信息</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  computed: {
    isCollapse() {
      if (Number(this.$store.state.screenWidth) < 1200) {
        this.$store.commit('SET_COLLAPSE', { isCollapse: true })
      } else {
        this.$store.commit('SET_COLLAPSE', { isCollapse: false })
      }
      return this.$store.state.isCollapse
    }
  },
  watch: {
    '$store.state.screenWidth': function (val) {
      if (Number(val) < 1200) {
        this.$store.commit('SET_COLLAPSE', { isCollapse: true })
      } else {
        this.$store.commit('SET_COLLAPSE', { isCollapse: false })
      }
    }
  }
}
</script>
