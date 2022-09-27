// 用户相关的接口请求函数都在这

import type { CodeType, Patient, User, UserInfo } from '@/types/user'
import { request } from '@/utils/rquest'

export const loginByPassword = (mobile: string, password: string) =>
  request<User>('login/password', 'POST', { mobile, password })

export const sendMobileCode = (mobile: string, type: CodeType) =>
  request('code', 'GET', { mobile, type })

export const loginByCode = (mobile: string, code: string) =>
  request<User>('login', 'POST', { mobile, code })

export const getUserInfo = () => request<UserInfo>('patient/myUser')

export const getPatientList = () => request<Patient[]>('patient/mylist')

export const addPatient = (patient: Patient) => request('patient/add', 'POST', patient)

export const updatePatient = (patient: Patient) => request('patient/update', 'PUT', patient)

export const deletePatient = (id: string) => request(`patient/del/${id}`, 'DELETE')

export const getPatientDetial = (id: string) => request<Patient>(`patient/info/${id}`)

export const loginByQQ = (openId: string) =>
  request<User>('/login/thirdparty', 'POST', { openId, source: 'qq' })

export const bindMobile = (data: { mobile: string; code: string; openId: string }) =>
  request<User>('/login/binding', 'POST', data)
