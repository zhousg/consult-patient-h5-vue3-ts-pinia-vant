import type { ExpressStatus, OrderType } from '@/enums'
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

export type OrderDetail = {
  id: string
  orderNo: string
  type: 4
  createTime: string
  prescriptionId: string
  status: OrderType
  statusValue: string
  medicines: Medical[]
  countDown: number
  addressInfo: Address
  expressInfo: {
    content: string
    time: string
  }
  payTime: string
  paymentMethod?: 0 | 1
  payment: number
  pointDeduction: number
  couponDeduction: number
  payment: number
  expressFee: number
  actualPayment: number
  roomId: string
}

// 物流信息类型
export type Express = {
  id: string
  content: string
  createTime: string
  status: ExpressStatus
  statusValue: string
}

export type Location = {
  //经
  longitude: string
  //纬
  latitude: string
}

export type Logistics = {
  // 预计到达时间
  estimatedTime: string
  name: string
  awbNo: string
  status: ExpressStatus
  statusValue: string
  list: Express[]
  logisticsInfo: Location[]
  currentLocationInfo: Location
}
