import type { KnowledgePage, KnowledgeParams } from '@/types/consult'
import { request } from '@/utils/rquest'

export const getKnowledgePage = (params: KnowledgeParams) =>
  request<KnowledgePage>('patient/home/knowledge', 'GET', params)
