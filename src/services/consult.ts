import type {
  DoctorPage,
  FollowType,
  Image,
  KnowledgePage,
  KnowledgeParams,
  PageParams,
  TopDep,
  ConsultOrderPreParams,
  ConsultOrderPreData,
  PartialConsult,
  ConsultOrderItem,
  ConsultOrderParams,
  ConsultOrderPage
} from '@/types/consult'
import { request } from '@/utils/rquest'

export const getKnowledgePage = (params: KnowledgeParams) =>
  request<KnowledgePage>('patient/home/knowledge', 'GET', params)

export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>('home/page/doc', 'GET', params)

export const followTarget = (id: string, type: FollowType = 'doc') =>
  request('like', 'POST', { id, type })

export const getAllDep = () => request<TopDep[]>('dep/all')

export const uploadImage = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return request<Image>('upload', 'POST', fd)
}

// 获取生成订单的信息，后台根据 问诊类型  和极速问诊的级别，确定一些金额。
export const getConsultOrderPre = (params: ConsultOrderPreParams) =>
  request<ConsultOrderPreData>('patient/consult/order/pre', 'GET', params)

// 生成订单
export const createConsultOrder = (data: PartialConsult) =>
  request<{ id: string }>('patient/consult/order', 'POST', data)

// 生成支付地址
export const getConsultOrderPayUrl = (data: {
  paymentMethod: 0 | 1
  orderId: string
  payCallback: string
}) => request<{ payUrl: string }>('patient/consult/pay', 'POST', data)

// 订单详情
export const getConsultOrderDetail = (orderId: string) =>
  request<ConsultOrderItem>('patient/consult/order/detail', 'GET', { orderId })

// 查看处方
export const getPrescriptionPic = (id: string) =>
  request<{ url: string }>(`patient/consult/prescription/${id}`)

// 提交评价
export const evaluateConsultOrder = (data: {
  docId: string
  orderId: string
  score: number
  content: string
  anonymousFlag: 0 | 1
}) => request<{ id: string }>('patient/order/evaluate', 'POST', data)

// 问诊记录分页查询
export const getConsultOrderList = (params: ConsultOrderParams) =>
  request<ConsultOrderPage>('patient/consult/order/list', 'GET', params)

// 取消订单
export const cancelOrder = (id: string) => request(`patient/order/cancel/${id}`, 'PUT')

// 删除订单
export const deleteOrder = (id: string) => request(`patient/order/${id}`, 'DELETE')
