// 用户相关的接口请求函数都在这

import type { User } from '@/types/user'
import { request } from '@/utils/rquest'

export const loginByPassword = (mobile: string, password: string) =>
  request<User>('login/password', 'POST', { mobile, password })
