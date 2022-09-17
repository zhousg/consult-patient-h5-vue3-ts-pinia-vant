export type User = {
  id: string
  account: string
  avatar: string
  mobile: string
  token: string
}

// 验证码类型
export type CodeType = 'login' | 'register' | 'changeMobile' | 'forgetPassword' | 'bindMobile'
