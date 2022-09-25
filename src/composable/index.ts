import type { FollowType } from '@/types/consult'
import { followTarget, getPrescriptionPic } from '@/services/consult'
import { ref } from 'vue'
import { ImagePreview } from 'vant'

export const useFollow = (type: FollowType = 'doc') => {
  // 关注逻辑
  const loading = ref(false)
  const follow = async (item: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true
    try {
      await followTarget(item.id, type)
      item.likeFlag = item.likeFlag === 1 ? 0 : 1
    } finally {
      // 不管成功和失败，都走
      loading.value = false
    }
  }

  return { loading, follow }
}

// 类型兼容
// const fn = (item: { id: number; name: string }) => {
//   console.log('类型兼容')
// }
// const obj = {
//   id: 10,
//   name: 'jack',
//   age: 18
// }

// fn(obj)

export const useShowPrescription = () => {
  // 查看处方
  const showPrescription = async (id?: string) => {
    if (id) {
      const res = await getPrescriptionPic(id)
      ImagePreview([res.data.url])
    }
  }
  return { showPrescription }
}
