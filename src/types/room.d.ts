import { MsgType, PrescriptionStatus } from '@/enums'
import type { Consult, Image } from './consult'
import type { Patient } from './user'

export type Medical = {
  id: string
  name: string
  amount: string
  avatar: string
  specs: string
  // 用量
  usageDosag: string
  quantity: string
  // 是否是处方药
  prescriptionFlag: 0 | 1
}

export type Prescription = {
  id: string
  orderId: string
  createTime: string
  name: string
  recordId: string
  gender: 0 | 1
  genderValue: string
  age: number
  // 诊断信息
  diagnosis: string
  status: PrescriptionStatus
  // 药品订单
  medicines: Medical[]
}

export type EvaluateDoc = {
  id?: string
  score?: number
  content?: string
  createTime?: string
  creator?: string
}

// 消息类型
export type Message = {
  id: string
  msgType: MsgType
  // 发消息的人ID
  from?: string
  fromAvatar?: string
  // 收消息的人ID
  to?: string
  toAvatar?: string
  createTime: string
  // 具体消息内容
  msg: {
    // 文字类型
    content?: string
    // 图片类型
    picture?: Image
    // 患者卡片
    consultRecord?: Consult & {
      patientInfo: Patient
    }
    // 处方信息
    prescription?: Prescription
    // 评价信息
    evaluateDoc?: EvaluateDoc
  }
  // 是否需要滚动
  notScroll?: boolean
}

// 消息分组
export type TimeMessages = {
  createTime: string
  items: Message[]
  orderId: string
  sid: string
}

// 消息分组
// 10点-12点   18条消息  { createTime: 10, items: [18条信息], orderId: 订单ID, sid: 服务器sessionID }
// 12点-14点   12条消息  { createTime: 12, items: [12条信息], orderId: 订单ID, sid: 服务器sessionID }
