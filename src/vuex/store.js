import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 1、state：创建初始化状态
const state = {
  token: window.sessionStorage.getItem('token'),
  role: window.sessionStorage.getItem('role'),
  id: window.sessionStorage.getItem('id'),
  screenWidth: document.documentElement.clientWidth,
  screenHeight: document.documentElement.clientHeight,
  isCollapse: false
}

// 2、mutations：创建改变状态的方法
const mutations = {
  // 状态变更函数-一般大写
  SET_AUTH(state, payload) {
    state.token = payload.token
    state.role = payload.role
    state.id = payload.id
    window.sessionStorage.setItem('token', payload.token)
    window.sessionStorage.setItem('role', payload.role)
    window.sessionStorage.setItem('id', payload.id)
  },
  CLEAR_AUTH(state) {
    state.token = undefined
    state.role = undefined
    state.id = undefined
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('role')
    window.sessionStorage.removeItem('id')
  },
  SET_COLLAPSE(state, payload) {
    state.isCollapse = payload.isCollapse
  }
}

// 3、getters：提供外部获取state
const getters = {}

// 4、actions：创建驱动方法改变mutations
const actions = {
  // 触发mutations中相应的方法-一般小写
}

// 5、全部注入Store中
const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

// 6、输出store
export default store
