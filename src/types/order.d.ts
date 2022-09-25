import type { Medical } from './room'

export type OrderPre = {
  id: string
  couponId: string
  pointDeduction: number
  couponDeduction: number
  payment: number
  // 运费
  expressFee: number
  actualPayment: number
  // 药品数组
  medicines: Medical[]
}
export type Address = {
  id: string
  mobile: string
  receiver: string
  province: string
  city: string
  county: string
  addressDetail: string
}

// 订单列表
export type AddressItem = Address & {
  isDefault: 0 | 1
  postalCode: string
}
