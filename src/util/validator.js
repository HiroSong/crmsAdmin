import Vue from 'vue'
import VeeValidate, {
  Validator
} from 'vee-validate'
import * as cn from '@/assets/js/zh_CN'

Vue.use(VeeValidate)

Validator.localize('cn', cn);

const config = {
  errorBagName: 'errors',
  delay: 0,
  locale: 'zh_CN',
  messages: null,
  strict: true
}

Validator.extend('username', {
  messages: {
    cn: () => '用户名输入错误'
  },
  validate: value => {
    return value.length > 5 && /^[0-9]*$/.test(value)
  }
})

// (以字母开头，长度在6~18之间，只能包含字母、数字和下划线)
Validator.extend('password', {
  messages: {
    cn: () => '密码输入错误'
  },
  validate: value => {
    return /^\w{5,17}$/.test(value)
  }
})

Vue.use(VeeValidate, config)
