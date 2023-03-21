<script setup lang="ts">
import { OrderType } from '@/enums'
import { getConsultOrderDetail } from '@/services/consult'
import type { ConsultOrderItem } from '@/types/consult'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ConsultMore from './components/ConsultMore.vue'
import { getConsultFlagText, getIllnessTimeText } from '@/utils/filter'
import {
  useCancelOrder,
  useDeleteOrder,
  useShowPrescription
} from '@/composables'
import { useClipboard } from '@vueuse/core'
import { showToast } from 'vant'

const route = useRoute()
const item = ref<ConsultOrderItem>()
onMounted(async () => {
  const res = await getConsultOrderDetail(route.params.id as string)
  item.value = res.data
})

const { loading, cancelConsultOrder } = useCancelOrder()

const router = useRouter()
const { loading: deleteLoading, deleteConsultOrder } = useDeleteOrder(() => {
  router.push('/user/consult')
})

const { onShowPrescription } = useShowPrescription()

// 复制
const { copy, isSupported } = useClipboard()
const onCopy = async () => {
  if (!isSupported.value) return showToast('未授权，不支持')
  await copy(item.value?.orderNo || '')
  showToast('已复制')
}

const show = ref(false)
</script>

<template>
  <div class="consult-detail-page" v-if="item">
    <cp-nav-bar title="问诊详情" />
    <div class="detail-head">
      <div class="text">
        <h3>图文问诊 {{ item.payment }} 元</h3>
        <span
          class="sta"
          :class="{
            orange: item.status === OrderType.ConsultPay,
            green: item.status === OrderType.ConsultChat
          }"
          >{{ item.statusValue }}</span
        >
        <p class="tip">服务医生信息</p>
      </div>
      <div class="card">
        <img class="avatar" src="@/assets/avatar-doctor.svg" alt="" />
        <p class="doc">
          <span>极速问诊</span>
          <span>{{ item.docInfo?.name || '暂未接诊' }}</span>
        </p>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="detail-patient">
      <van-cell-group :border="false">
        <van-cell
          title="患者信息"
          :value="`${item.patientInfo.name} | ${item.patientInfo.genderValue} | ${item.patientInfo.age}岁`"
        />
        <van-cell
          title="患病时长"
          :value="getIllnessTimeText(item.illnessTime)"
        />
        <van-cell
          title="就诊情况"
          :value="getConsultFlagText(item.consultFlag)"
        />
        <van-cell title="病情描述" :label="item.illnessDesc" />
      </van-cell-group>
    </div>
    <div class="detail-order">
      <h3>订单信息</h3>
      <van-cell-group :border="false">
        <van-cell title="订单编号">
          <template #value>
            <span class="copy" @click="onCopy()">复制</span>
            {{ item.orderNo }}
          </template>
        </van-cell>
        <van-cell title="创建时间" :value="item.createTime" />
        <van-cell title="应付款" :value="`￥${item.payment}`" />
        <van-cell title="优惠券" :value="`-￥${item.couponDeduction}`" />
        <van-cell title="积分抵扣" :value="`-￥${item.pointDeduction}`" />
        <van-cell
          title="实付款"
          :value="`￥${item.actualPayment}`"
          class="price"
        />
      </van-cell-group>
    </div>
    <div class="detail-time" v-if="item.status === OrderType.ConsultPay">
      请在
      <van-count-down :time="item.countdown * 1000" />
      内完成支付，超时订单将取消
    </div>
    <div
      class="detail-action van-hairline--top"
      v-if="item.status === OrderType.ConsultPay"
    >
      <div class="price">
        <span>需付款</span>
        <span>￥{{ item.actualPayment.toFixed(2) }}</span>
      </div>
      <van-button
        type="default"
        round
        :loading="loading"
        @click="cancelConsultOrder(item!)"
        >取消问诊</van-button
      >
      <van-button type="primary" round @click="show = true">
        继续支付
      </van-button>
    </div>
    <div
      class="detail-action van-hairline--top"
      v-if="item.status === OrderType.ConsultWait"
    >
      <van-button
        type="default"
        round
        :loading="loading"
        @click="cancelConsultOrder(item!)"
        >取消问诊</van-button
      >
      <van-button type="primary" round :to="`/room?orderId=${item.id}`">
        继续沟通
      </van-button>
    </div>
    <div
      class="detail-action van-hairline--top"
      v-if="item.status === OrderType.ConsultChat"
    >
      <van-button
        @click="onShowPrescription(item?.prescriptionId)"
        v-if="item.prescriptionId"
        type="default"
        round
      >
        查看处方
      </van-button>
      <van-button type="primary" round :to="`/room?orderId=${item.id}`">
        继续沟通
      </van-button>
    </div>
    <div
      class="detail-action van-hairline--top"
      v-if="item.status === OrderType.ConsultComplete"
    >
      <consult-more
        :disabled="!item.prescriptionId"
        @on-preview="onShowPrescription(item?.prescriptionId)"
        @on-delete="deleteConsultOrder(item!)"
      ></consult-more>
      <van-button type="default" round :to="`/room?orderId=${item.id}`">
        问诊记录
      </van-button>
      <van-button v-if="item.evaluateId" type="default" round>
        查看评价
      </van-button>
      <van-button v-else type="primary" round> 写评价 </van-button>
    </div>
    <div
      class="detail-action van-hairline--top"
      v-if="item.status === OrderType.ConsultCancel"
    >
      <van-button
        type="default"
        round
        :loading="deleteLoading"
        @click="deleteConsultOrder(item!)"
      >
        删除订单
      </van-button>
      <van-button type="primary" round :to="`/`"> 咨询其他医生 </van-button>
    </div>
    <!-- 支付抽屉 -->
    <cp-pay-sheet
      v-model:show="show"
      :order-id="item.id"
      :actual-payment="item.actualPayment"
      pay-callback="/room"
    ></cp-pay-sheet>
  </div>
  <div class="consult-detail-page" v-else>
    <cp-nav-bar title="问诊详情"></cp-nav-bar>
    <van-skeleton title :row="4" style="margin-top: 30px"></van-skeleton>
    <van-skeleton title :row="4" style="margin-top: 30px"></van-skeleton>
  </div>
</template>

<style lang="scss" scoped>
.consult-detail-page {
  padding: 46px 0 110px 0;
}
.detail-head {
  height: 140px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 135px;
    background: linear-gradient(
      180deg,
      rgba(44, 181, 165, 0),
      rgba(44, 181, 165, 0.2)
    );
    border-bottom-left-radius: 150px 20px;
    border-bottom-right-radius: 150px 20px;
  }
  padding: 15px;
  .text {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 3px;
    .sta {
      color: var(--cp-tag);
      font-weight: 500;
      font-size: 16px;
      &.green {
        color: var(--cp-primary);
      }
      &.orange {
        color: #f2994a;
      }
    }
    .tip {
      width: 100%;
      color: var(--cp-text3);
      margin-top: 5px;
    }
  }
  .card {
    height: 74px;
    background-color: #fff;
    border-radius: 8px;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 15px;
    box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
    .avatar {
      width: 38px;
      height: 38px;
    }
    .doc {
      flex: 1;
      padding-left: 15px;
      > span {
        display: block;
        font-size: 16px;
        &:last-child {
          font-size: 13px;
          color: var(--cp-text3);
        }
      }
    }
    .van-icon {
      color: var(--cp-tip);
    }
  }
}
.detail-patient {
  &::after {
    content: '';
    display: block;
    height: 12px;
    background-color: var(--cp-bg);
  }
}
.detail-order {
  > h3 {
    padding: 10px 18px;
    font-weight: normal;
  }
  .copy {
    padding: 2px 10px;
    border: 1px solid var(--cp-primary);
    background-color: var(--cp-plain);
    color: var(--cp-primary);
    font-size: 12px;
    border-radius: 12px;
    margin-right: 10px;
  }
  :deep(.van-cell__title) {
    width: 70px;
    flex: none;
  }
  .price :deep(.van-cell__value) {
    font-size: 16px;
    color: var(--cp-price);
  }
}
.detail-action {
  height: 65px;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: flex-end;
  padding: 0 15px;
  box-sizing: border-box;
  .price {
    flex: 1;
    > span:last-child {
      font-size: 18px;
      color: var(--cp-price);
      padding-left: 5px;
    }
  }
  .van-button {
    margin-left: 10px;
    padding-left: 17px;
    padding-right: 17px;
  }
  :deep(.van-button--default) {
    background-color: var(--cp-bg);
    color: var(--cp-text3);
  }
}
.van-cell {
  padding-left: 18px;
  padding-right: 18px;
}
.detail-time {
  position: fixed;
  left: 0;
  bottom: 65px;
  width: 100%;
  height: 44px;
  background-color: #fff7eb;
  text-align: center;
  line-height: 44px;
  font-size: 13px;
  color: #f2994a;
  .van-count-down {
    display: inline;
    color: #f2994a;
  }
}
</style>
