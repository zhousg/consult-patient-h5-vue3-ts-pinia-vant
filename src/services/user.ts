// 用户相关的接口请求函数都在这

import type { CodeType, User } from '@/types/user'
import { request } from '@/utils/rquest'

export const loginByPassword = (mobile: string, password: string) =>
  request<User>('login/password', 'POST', { mobile, password })

export const sendMobileCode = (mobile: string, type: CodeType) =>
  request('code', 'GET', { mobile, type })

export const loginByCode = (mobile: string, code: string) =>
  request<User>('login', 'POST', { mobile, code })
