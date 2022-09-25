import type { AddressItem, OrderPre } from '@/types/order'
import { request } from '@/utils/rquest'

export const getMedicalOrderPre = (params: { prescriptionId: string }) =>
  request<OrderPre>('patient/medicine/order/pre', 'GET', params)

export const getAddressList = () => request<AddressItem[]>('patient/order/address', 'GET')

export const createMedicalOrder = (data: { id: string; couponId: string; addressId: string }) =>
  request<{ id: string }>('patient/medicine/order', 'POST', data)
