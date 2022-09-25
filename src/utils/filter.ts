import type { ConsultTime } from '@/enums'
import { consultFlagOptions, illnessTimeOptions } from '@/services/constants'

// 获取患病时间文字
export const getIllnessTimeText = (time?: ConsultTime) => {
  return illnessTimeOptions.find((item) => item.value === time)?.label
}
// 获取是否就诊文字
export const getConsultFlagText = (flag?: 0 | 1) => {
  return consultFlagOptions.find((item) => item.value === flag)?.label
}
