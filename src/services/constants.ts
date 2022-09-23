import { ConsultTime } from '@/enums'

export const illnessTimeOptions = [
  { label: '一周内', value: ConsultTime.Week },
  { label: '一月内', value: ConsultTime.Month },
  { label: '半年内', value: ConsultTime.HalfYear },
  { label: '半年以上', value: ConsultTime.More }
]
export const consultFlagOptions = [
  { label: '就诊过', value: 1 },
  { label: '没就诊过', value: 0 }
]
