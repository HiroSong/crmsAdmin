<template>
  <el-container>
    <el-main>
      <div class="title-label text-center top">o(╥﹏╥)o</div>
      <el-row type="flex" justify="center">
        <el-col>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon-test"></use>
            </svg>
          </div>
        </el-col>
      </el-row>
      <div class="title-label text-center small-gap">页面找不到了</div>
      <el-row type="flex" justify="center" class="normal-gap">
        <el-button @click.native.prevent="returnPage">返回</el-button>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  methods: {
    returnPage() {
      this.$router.back()
    }
  }
}
</script>
