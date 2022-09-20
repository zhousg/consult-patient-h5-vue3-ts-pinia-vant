import type {
  DoctorPage,
  FollowType,
  KnowledgePage,
  KnowledgeParams,
  PageParams,
  TopDep
} from '@/types/consult'
import { request } from '@/utils/rquest'

export const getKnowledgePage = (params: KnowledgeParams) =>
  request<KnowledgePage>('patient/home/knowledge', 'GET', params)

export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>('home/page/doc', 'GET', params)

export const followTarget = (id: string, type: FollowType = 'doc') =>
  request('like', 'POST', { id, type })

export const getAllDep = () => request<TopDep[]>('dep/all')
