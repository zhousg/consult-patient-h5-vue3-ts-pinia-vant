import type { AddressItem, OrderPre } from '@/types/order'
import { request } from '@/utils/request'

export const getMedicalOrderPre = (params: { prescriptionId: string }) =>
  request<OrderPre>('patient/medicine/order/pre', 'GET', params)

export const getAddresList = () =>
  request<AddressItem[]>('patient/order/address')
