<script setup lang="ts">
import { useOrderDetail } from '@/composables'
import { OrderType } from '@/enums'
import { useRoute } from 'vue-router'
import OrderMedical from './components/OrderMedical.vue'

const route = useRoute()
const { order } = useOrderDetail(route.params.id as string)
</script>

<template>
  <div class="order-detail-page" v-if="order">
    <cp-nav-bar :title="`药品订单详情-${order.statusValue}`" />
    <div class="order-head">
      <div
        class="address"
        v-if="
          order.status === OrderType.MedicineCancel ||
          order.status === OrderType.MedicinePay ||
          order.status === OrderType.MedicineSend
        "
      >
        <p class="area">
          <van-icon name="location" />
          <span>{{
            order.addressInfo.province +
            order.addressInfo.city +
            order.addressInfo.county
          }}</span>
        </p>
        <p class="detail">{{ order.addressInfo.addressDetail }}</p>
        <p>
          {{ order.addressInfo.receiver }}
          {{
            order.addressInfo.mobile.replace(/^(\d{3})\d+(\d{4})$/, '$1****$2')
          }}
        </p>
      </div>
      <div
        class="card"
        v-else
        @click="$router.push(`/order/logistics/${order?.id}`)"
      >
        <div class="logistics">
          <p>{{ order.expressInfo.content }}</p>
          <p>{{ order.expressInfo.time }}</p>
        </div>
        <van-icon name="arrow" />
      </div>
    </div>
    <order-medical :medicines="order.medicines"></order-medical>
    <div class="order-detail">
      <van-cell-group>
        <van-cell title="药品金额" :value="`￥${order.payment}`" />
        <van-cell title="运费" :value="`￥${order.expressFee}`" />
        <van-cell title="优惠券" :value="`-￥${order.couponDeduction}`" />
        <van-cell
          title="实付款"
          :value="`￥${order.actualPayment}`"
          class="price"
        />
        <van-cell title="订单编号" :value="order.orderNo" />
        <van-cell title="创建时间" :value="order.createTime" />
        <template
          v-if="
            order.status === OrderType.MedicineSend ||
            order.status === OrderType.MedicineTake ||
            order.status === OrderType.MedicineComplete
          "
        >
          <van-cell title="支付时间" :value="order.payTime" />
          <van-cell
            title="支付方式"
            :value="order.paymentMethod === 1 ? '支付宝' : '微信'"
          />
        </template>
      </van-cell-group>
    </div>
    <!-- 已取消 -->
    <van-action-bar v-if="order.status === OrderType.MedicineCancel">
      <van-action-bar-icon icon="delete-o" text="删除" />
      <van-action-bar-button type="primary" text="沟通记录" />
    </van-action-bar>
    <!-- 待收货 -->
    <van-action-bar v-if="order.status === OrderType.MedicineTake">
      <van-action-bar-button type="primary" text="确认收货" />
    </van-action-bar>
    <!-- 待发货 -->
    <van-action-bar v-if="order.status === OrderType.MedicineSend">
      <van-action-bar-button type="primary" text="提醒发货" />
    </van-action-bar>
    <!-- 待支付 -->
    <van-action-bar v-if="order.status === OrderType.MedicinePay">
      <p class="price">
        需要支付：<span>￥{{ order.actualPayment }}</span>
      </p>
      <van-action-bar-button color="#bbb" text="取消订单" />
      <van-action-bar-button type="primary" text="继续支付" />
    </van-action-bar>
    <!-- 已完成 -->
    <van-action-bar v-if="order.status === OrderType.MedicineComplete">
      <van-action-bar-icon icon="delete-o" text="删除" />
      <van-action-bar-button type="primary" text="再次购买" />
    </van-action-bar>
  </div>
</template>

<style lang="scss" scoped>
.order-detail-page {
  padding-top: 46px;
  padding-bottom: 65px;
}
.address {
  padding: 15px;
  background-color: #fff;
  font-size: 13px;
  position: relative;
  box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
  border-radius: 8px;
  .area {
    color: var(--cp-tag);
    margin-bottom: 5px;
    .van-icon-location {
      color: #ff7702;
      font-size: 14px;
    }
  }
  .detail {
    font-size: 17px;
    margin-bottom: 5px;
  }
}
.order-head {
  position: relative;
  padding: 15px;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 80px;
    background: linear-gradient(
      180deg,
      rgba(44, 181, 165, 0),
      rgba(44, 181, 165, 0.2)
    );
    border-bottom-left-radius: 150px 20px;
    border-bottom-right-radius: 150px 20px;
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
    .logistics {
      flex: 1;
      p {
        &:first-child {
          color: var(--cp-primary);
        }
        &:last-child {
          color: var(--cp-tag);
          font-size: 13px;
          margin-top: 5px;
        }
      }
    }
    .van-icon {
      color: var(--cp-tip);
    }
  }
}
:deep(.van-cell) {
  .van-cell__title {
    font-size: 14px;
    flex: none;
    width: 100px;
  }
  .van-cell__value {
    font-size: 14px;
  }
  &.price {
    .van-cell__value {
      font-size: 18px;
      color: var(--cp-price);
    }
  }
}
.order-medical {
  background-color: #fff;
  padding: 0 15px;
  .head {
    display: flex;
    height: 54px;
    align-items: center;
    > h3 {
      font-size: 16px;
      font-weight: normal;
    }
    > small {
      font-size: 13px;
      color: var(--cp-tag);
      margin-left: 10px;
    }
  }
  .item {
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0;
    .img {
      width: 80px;
      height: 70px;
      border-radius: 2px;
      overflow: hidden;
    }
    .info {
      padding-left: 15px;
      width: 250px;
      .name {
        display: flex;
        font-size: 15px;
        margin-bottom: 5px;
        > span:first-child {
          width: 200px;
        }
        > span:last-child {
          width: 50px;
          text-align: right;
        }
      }
      .size {
        margin-bottom: 5px;
        .van-tag {
          background-color: var(--cp-primary);
          vertical-align: middle;
        }
        span:not(.van-tag) {
          margin-left: 10px;
          color: var(--cp-tag);
          vertical-align: middle;
        }
      }
      .price {
        font-size: 16px;
        color: #eb5757;
      }
    }
    .desc {
      width: 100%;
      background-color: var(--cp-bg);
      border-radius: 4px;
      margin-top: 10px;
      padding: 4px 10px;
      color: var(--cp-tip);
    }
  }
}
.van-action-bar {
  padding: 0 10px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  .price {
    padding: 0 10px;
    > span {
      font-size: 18px;
      color: var(--cp-price);
    }
  }
}
</style>
