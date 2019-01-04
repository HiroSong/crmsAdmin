<template>
  <div id="app">
    <adjust-screen v-if="isVertical"></adjust-screen>
    <div v-else>
      <transition name="fade" mode="out-in">
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view></router-view>
        </keep-alive>
        <router-view v-else/>
      </transition>
    </div>
  </div>
</template>

<script>
import AdjustScreen from '@/components/common/AdjustScreen'

export default {
  name: 'App',
  components: {
    'adjust-screen': AdjustScreen
  },
  computed: {
    isVertical() {
      return this.$store.state.screenWidth < this.$store.state.screenHeight
    }
  },
  mounted() {
    var _this = this
    window.onresize = function () {
      _this.$store.state.screenWidth = document.documentElement.clientWidth
      _this.$store.state.screenHeight = document.documentElement.clientHeight
    }
  }
}
</script>

<style scoped>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1rem;
  height: 100%;
}
</style>
