import type { ConsultOrderItem, FollowType } from '@/types/consult'
import { cancelOrder, deleteOrder, followTarget, getPrescriptionPic } from '@/services/consult'
import { onMounted, onUnmounted, ref, type Ref } from 'vue'
import { ImagePreview, Toast, type FormInstance } from 'vant'
import { OrderType } from '@/enums'
import type { OrderDetail } from '@/types/order'
import { getMedicalOrderDetail } from '@/services/order'
import { sendMobileCode } from '@/services/user'
import type { CodeType } from '@/types/user'

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

export const useOrderDetail = (id: string) => {
  const order = ref<OrderDetail>()
  const loading = ref(false)
  onMounted(async () => {
    loading.value = true
    try {
      const res = await getMedicalOrderDetail(id)
      order.value = res.data
    } finally {
      loading.value = false
    }
  })
  return { loading, order }
}

export const useMobileCode = (mobile: Ref<string>, type: CodeType) => {
  const time = ref(0)
  const form = ref<FormInstance | null>(null)
  let timerId: number
  const send = async () => {
    if (time.value > 0) return
    await form.value?.validate('mobile')
    // 上面的校验成功发验证码
    await sendMobileCode(mobile.value, type)
    time.value = 60
    Toast.success('发送成功')
    // 开启倒计时
    if (timerId) clearInterval(timerId)
    timerId = window.setInterval(() => {
      time.value--
      if (time.value <= 0) clearInterval(timerId)
    }, 1000)
  }

  onUnmounted(() => {
    clearInterval(timerId)
  })

  return { form, time, send }
}
