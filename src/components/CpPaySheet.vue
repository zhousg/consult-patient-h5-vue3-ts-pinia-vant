<script setup lang="ts">
import { getConsultOrderPayUrl } from '@/services/consult'
import { showLoadingToast, showToast } from 'vant'
import { ref } from 'vue'

// show 控制显示隐藏（支持v-model:show）
// orderId 订单ID
// actualPayment 实付金额
// onClose 关闭前的函数
const props = defineProps<{
  show: boolean
  orderId: string
  actualPayment: number
  onClose?: () => void
  payCallback: string
}>()

const emit = defineEmits<{
  (e: 'update:show', val: boolean): void
}>()

const paymentMethod = ref<0 | 1>()
// 支付逻辑
const pay = async () => {
  if (paymentMethod.value === undefined) return showToast('请选择支付方式')
  showLoadingToast({ message: '跳转支付', duration: 0 })
  const res = await getConsultOrderPayUrl({
    paymentMethod: paymentMethod.value,
    orderId: props.orderId,
    payCallback: import.meta.env.VITE_APP_CALLBACK + props.payCallback
  })
  window.location.href = res.data.payUrl
}
</script>

<template>
  <van-action-sheet
    :show="show"
    @update:show="emit('update:show', $event)"
    title="选择支付方式"
    :close-on-popstate="false"
    :closeable="false"
    :before-close="onClose"
  >
    <div class="pay-type">
      <p class="amount">￥ {{ actualPayment.toFixed(2) }}</p>
      <van-cell-group>
        <van-cell title="微信支付" @click="paymentMethod = 0">
          <template #icon><cp-icon name="consult-wechat" /></template>
          <template #extra>
            <van-checkbox :checked="paymentMethod === 0" />
          </template>
        </van-cell>
        <van-cell title="支付宝支付" @click="paymentMethod = 1">
          <template #icon><cp-icon name="consult-alipay" /></template>
          <template #extra>
            <van-checkbox :checked="paymentMethod === 1" />
          </template>
        </van-cell>
      </van-cell-group>
      <div class="btn">
        <van-button @click="pay" type="primary" round block>
          立即支付
        </van-button>
      </div>
    </div>
  </van-action-sheet>
</template>

<style lang="scss" scoped>
.pay-type {
  .amount {
    padding: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .btn {
    padding: 15px;
  }
  .van-cell {
    align-items: center;
    .cp-icon {
      margin-right: 10px;
      font-size: 18px;
    }
    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
  }
}
</style>
