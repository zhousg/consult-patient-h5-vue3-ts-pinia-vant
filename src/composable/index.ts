import type { ConsultOrderItem, FollowType } from '@/types/consult'
import { cancelOrder, deleteOrder, followTarget, getPrescriptionPic } from '@/services/consult'
import { ref } from 'vue'
import { ImagePreview, Toast } from 'vant'
import { OrderType } from '@/enums'

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

// 取消订单
export const useCancelOrder = () => {
  const loading = ref(false)
  const onCancelOrder = async (item: ConsultOrderItem) => {
    loading.value = true
    try {
      await cancelOrder(item.id)
      // 修改订单的状态
      item.status = OrderType.ConsultCancel
      item.statusValue = '已取消'
      Toast.success('取消成功')
    } catch (e) {
      Toast.fail('取消失败')
    } finally {
      loading.value = false
    }
  }
  return { loading, onCancelOrder }
}

// 删除订单，删除成功做的事不确定，可以通过传入函数实现。
export const useDeleteOrder = (cb: () => void) => {
  const loading = ref(false)
  const deleteConsultOrder = async (item: ConsultOrderItem) => {
    loading.value = true
    try {
      await deleteOrder(item.id)
      // 成功，通知父组件删除这条信息，提示，详情就是跳转列表页面
      Toast.success('删除成功')
      cb && cb()
    } catch (e) {
      Toast.fail('删除失败')
    } finally {
      loading.value = false
    }
  }
  return { loading, deleteConsultOrder }
}
