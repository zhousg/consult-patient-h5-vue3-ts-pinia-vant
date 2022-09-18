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
