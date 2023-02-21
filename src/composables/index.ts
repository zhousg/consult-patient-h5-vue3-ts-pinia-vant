import { followOrUnfollow } from '@/services/consult'
import type { FollowType } from '@/types/consult'
import { ref } from 'vue'

// Vue3概念：通过组合式API封装 数据逻辑 在一起的函数，组合式函数 useXxx
// composable
export const useFollow = (type: FollowType = 'doc') => {
  const loading = ref(false)
  const follow = async (item: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true
    try {
      await followOrUnfollow(item.id, type)
      item.likeFlag = item.likeFlag === 1 ? 0 : 1
    } finally {
      loading.value = false
    }
  }
  return { loading, follow }
}
