import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'

Vue.use(Router)

const router = new Router({
  base: '/',
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    name: 'LoginPage',
    meta: {
      title: '登录',
      keepAlive: true
    },
    component: resolve => require(['@/components/common/LoginPage'], resolve)
  }, {
    path: '/teachers',
    name: 'TeacherInfo',
    meta: {
      title: '教师信息管理',
      requiresAuth: true,
      requireRole: 'admin'
    },
    component: resolve => require(['@/components/admin/TeacherInfo'], resolve)
  }, {
    path: '/teachers/modify',
    name: 'ModifyTeacher',
    meta: {
      title: '修改教师信息',
      requiresAuth: true,
      requireRole: 'admin'
    },
    component: resolve => require(['@/components/admin/ModifyTeacher'], resolve)
  }, {
    path: '/teachers/create',
    name: 'CreateTeacher',
    meta: {
      title: '创建教师用户',
      requiresAuth: true,
      requireRole: 'admin',
      keepAlive: true
    },
    component: resolve => require(['@/components/admin/CreateTeacher'], resolve)
  }, {
    path: '/students',
    name: 'StudentInfo',
    meta: {
      title: '学生信息管理',
      requiresAuth: true,
      requireRole: 'admin'
    },
    component: resolve => require(['@/components/admin/StudentInfo'], resolve)
  }, {
    path: '/students/modify',
    name: 'ModifyStudent',
    meta: {
      title: '修改学生信息',
      requiresAuth: true,
      requireRole: 'admin'
    },
    component: resolve => require(['@/components/admin/ModifyStudent'], resolve)
  }, {
    path: '/*',
    name: '404Page',
    meta: {
      title: '404',
      keepAlive: true
    },
    component: resolve => require(['@/components/common/404'], resolve)
  }]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.matched.some(record => record.name === 'LoginPage')) {
    store.commit('CLEAR_AUTH')
    next()
  }
  const role = store.state.role ? store.state.role : window.sessionStorage.getItem('role')
  const token = store.state.token ? store.state.token : window.sessionStorage.getItem('token')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (to.matched.some(record => record.meta.requireRole !== role) ||
      !token) {
      next(false)
    } else {
      next()
    }
  } else {
    next()
  }
});

export default router
