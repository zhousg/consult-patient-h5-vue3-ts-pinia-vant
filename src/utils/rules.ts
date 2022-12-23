import type { FieldRule } from 'vant'

// 提供校验规则
const mobileRules: FieldRule[] = [
  { required: true, message: '请输入手机号' },
  { pattern: /^1[3-9]\d{9}$/, message: '手机号不正确' }
]

const passwordRules: FieldRule[] = [
  { required: true, message: '请输入密码' },
  {
    pattern: /^\w{8,24}$/,
    message: '密码必须是8-24个字符'
  }
]

const codeRules: FieldRule[] = [
  { required: true, message: '请输入短信验证码' },
  { pattern: /^\d{6}$/, message: '验证码是6个数字' }
]

export { mobileRules, passwordRules, codeRules }
