<script setup lang="ts">
import { useCancelOrder, useDeleteOrder, useShowPrescription } from '@/composable'
import { OrderType } from '@/enums'
import type { ConsultOrderItem } from '@/types/consult'

const props = defineProps<{
  item: ConsultOrderItem
}>()

// body区域，点击后去订单详细
// foot区域，根据订单状态展示按钮
// 待支付：取消问诊+去支付
// 待接诊：取消问诊+继续沟通
// 咨询中：查看处方（如果开了）+继续沟通
// 已完成：更多（查看处方，如果开了，删除订单）+问诊记录+（未评价?写评价:查看评价）
// 已取消：删除订单+咨询其他医生
// const showPopover = ref(false)
// const actions = computed(() => [
//   { text: '查看处方', disabled: !props.item.prescriptionId },
//   { text: '删除订单' }
// ])
// const onSelect = (action: { text: string }, i: number) => {
//   // 点击选项
//   if (i === 1) {
//     deleteConsulOrder(props.item)
//   }
//   if (i === 0) {
//     showPrescription(props.item.prescriptionId)
//   }
// }

// 取消订单
// const loading = ref(false)
// const onCancelOrder = async (item: ConsultOrderItem) => {
//   loading.value = true
//   try {
//     await cancelOrder(item.id)
//     // 修改订单的状态
//     item.status = OrderType.ConsultCancel
//     item.statusValue = '已取消'
//     Toast.success('取消成功')
//   } catch (e) {
//     Toast.fail('取消失败')
//   } finally {
//     loading.value = false
//   }
// }
const { loading, onCancelOrder } = useCancelOrder()

// 删除订单
// 加载效果，API函数，点击调用
const emit = defineEmits<{
  (e: 'on-delete', id: string): void
}>()
const { loading: deleteLoading, deleteConsultOrder } = useDeleteOrder(() => {
  emit('on-delete', props.item.id)
})
// const deleteLoading = ref(false)
// const deleteConsulOrder = async (item: ConsultOrderItem) => {
//   deleteLoading.value = true
//   try {
//     await deleteOrder(item.id)
//     // 成功，通知父组件删除这条信息，提示
//     emit('on-delete', item.id)
//     Toast.success('删除成功')
//   } catch (e) {
//     Toast.fail('删除失败')
//   } finally {
//     deleteLoading.value = false
//   }
// }

// 查看处方
const { showPrescription } = useShowPrescription()
</script>

<template>
  <div class="consult-item">
    <div class="head van-hairline--bottom">
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <p>极速问诊（自动分配医生）</p>
      <span
        :class="{
          orange: item.status === OrderType.ConsultPay,
          green: item.status === OrderType.ConsultChat
        }"
        >{{ item.statusValue }}</span
      >
    </div>
    <div class="body" @click="$router.push(`/user/consult/${item.id}`)">
      <div class="body-row">
        <div class="body-label">病情描述</div>
        <div class="body-value">{{ item.illnessDesc }}</div>
      </div>
      <div class="body-row">
        <div class="body-label">价格</div>
        <div class="body-value">¥ {{ item.payment }}</div>
      </div>
      <div class="body-row">
        <div class="body-label">创建时间</div>
        <div class="body-value tip">{{ item.createTime }}</div>
      </div>
    </div>
    <div class="foot" v-if="item.status === OrderType.ConsultPay">
      <van-button
        class="gray"
        plain
        size="small"
        round
        :loading="loading"
        @click="onCancelOrder(item)"
      >
        取消问诊
      </van-button>
      <van-button type="primary" plain size="small" round :to="`/user/consult/${item.id}`">
        去支付
      </van-button>
    </div>
    <div class="foot" v-if="item.status === OrderType.ConsultWait">
      <van-button
        class="gray"
        plain
        size="small"
        round
        :loading="loading"
        @click="onCancelOrder(item)"
      >
        取消问诊
      </van-button>
      <van-button type="primary" plain size="small" round :to="`/room?orderId=${item.id}`">
        继续沟通
      </van-button>
    </div>
    <div class="foot" v-if="item.status === OrderType.ConsultChat">
      <van-button
        @click="showPrescription(item.prescriptionId)"
        ass="gray"
        plain
        size="small"
        round
        v-if="item.prescriptionId"
      >
        查看处方
      </van-button>
      <van-button type="primary" plain size="small" round :to="`/room?orderId=${item.id}`">
        继续沟通
      </van-button>
    </div>
    <div class="foot" v-if="item.status === OrderType.ConsultComplete">
      <!-- <div class="more">
        <van-popover
          v-model:show="showPopover"
          :actions="actions"
          @select="onSelect"
          placement="top-start"
        >
          <template #reference> 更多 </template>
        </van-popover>
      </div> -->
      <cp-consult-more
        :disabled="!item.prescriptionId"
        @on-delete="deleteConsultOrder(item)"
        @on-preview="showPrescription(item.prescriptionId)"
      ></cp-consult-more>
      <van-button class="gray" plain size="small" round :to="`/room?orderId=${item.id}`">
        问诊记录
      </van-button>
      <van-button v-if="!item.evaluateId" type="primary" plain size="small" round>
        写评价
      </van-button>
      <van-button v-else class="gray" plain size="small" round> 查看评价 </van-button>
    </div>
    <div class="foot" v-if="item.status === OrderType.ConsultCancel">
      <van-button
        class="gray"
        plain
        size="small"
        round
        :loading="deleteLoading"
        @click="deleteConsultOrder(item)"
        >删除订单</van-button
      >
      <van-button type="primary" plain size="small" round to="/"> 咨询其他医生 </van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-item {
  border-radius: 4px;
  box-shadow: 0px 0px 22px 0px rgba(245, 245, 245, 0.1);
  background-color: #fff;
  margin-bottom: 10px;
  .head {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 15px;
    .img {
      width: 20px;
      height: 20px;
    }
    > p {
      flex: 1;
      font-size: 15px;
      padding-left: 10px;
    }
    > span {
      color: var(--cp-tag);
      &.orange {
        color: #f2994a;
      }
      &.green {
        color: var(--cp-primary);
      }
    }
  }
  .body {
    padding: 15px 15px 8px 15px;
    .body-row {
      display: flex;
      margin-bottom: 7px;
    }
    .body-label {
      width: 62px;
      font-size: 13px;
      color: var(--cp-tip);
    }
    .body-value {
      width: 250px;
      &.tip {
        color: var(--cp-tip);
      }
    }
  }
  .foot {
    padding: 0 15px 15px 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .van-button {
      margin-left: 10px;
      padding: 0 16px;
      &.gray {
        color: var(--cp-text3);
        background-color: var(--cp-bg);
      }
    }
    .more {
      color: var(--cp-tag);
      flex: 1;
      font-size: 13px;
    }
  }
}
</style>
