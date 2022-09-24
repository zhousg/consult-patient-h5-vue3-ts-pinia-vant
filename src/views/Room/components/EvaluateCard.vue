<script setup lang="ts">
import { evaluateConsultOrder } from '@/services/consult'
import type { ConsultOrderItem } from '@/types/consult'
import type { EvaluateDoc } from '@/types/room'
import { Toast } from 'vant'
import { computed, inject, ref, type Ref } from 'vue'

defineProps<{
  evaluateDoc?: EvaluateDoc
}>()

// 收集评价需要提交数据
// 表单：score content anonymousFlag
// 爷爷：consult.id 订单ID  consult.docInfo.id 医生ID
const score = ref(0)
const content = ref('')
const anonymousFlag = ref(false)
const disabled = computed(() => score.value === 0 || !content.value)

const consult = inject<Ref<ConsultOrderItem>>('consult')
const completeEva = inject<(score: number) => void>('completeEva')
const submit = async () => {
  if (!score.value) return Toast('请选择评分')
  if (!content.value) return Toast('请输入评语')
  if (!consult?.value) return Toast('问诊订单未找到')
  if (consult.value.docInfo?.id) {
    await evaluateConsultOrder({
      docId: consult.value.docInfo?.id,
      orderId: consult.value.id,
      score: score.value,
      content: content.value,
      anonymousFlag: anonymousFlag.value ? 1 : 0
    })
    // 评价请求成功，改成已评价
    completeEva && completeEva(score.value)
    // ===
    // if (completeEva) {
    //   completeEva(score.value)
    // }
  }
}
</script>

<template>
  <!-- 展示 -->
  <div class="evalutate-card" v-if="evaluateDoc">
    <p class="title">医生服务评价</p>
    <p class="desc">我们会更加努力提升服务质量</p>
    <van-rate
      :modelValue="evaluateDoc.score"
      size="7vw"
      gutter="3vw"
      color="#FADB14"
      void-icon="star"
      void-color="rgba(0,0,0,0.04)"
    />
  </div>
  <!-- 评价 -->
  <div class="evalutate-card" v-else>
    <p class="title">感谢您的评价</p>
    <p class="desc">本次在线问诊服务您还满意吗？</p>
    <van-rate
      v-model="score"
      size="7vw"
      gutter="3vw"
      color="#FADB14"
      void-icon="star"
      void-color="rgba(0,0,0,0.04)"
    />
    <van-field
      v-model="content"
      type="textarea"
      maxlength="150"
      show-word-limit
      rows="3"
      placeholder="请描述您对医生的评价或是在医生看诊过程中遇到的问题"
    ></van-field>
    <div class="footer">
      <van-checkbox v-model="anonymousFlag">匿名评价</van-checkbox>
      <van-button :class="{ disabled }" @click="submit" type="primary" size="small" round>
        提交评价
      </van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.evalutate-card {
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  padding: 15px;
  .title {
    font-size: 15px;
    margin-bottom: 5px;
  }
  .desc {
    font-size: 12px;
    margin-bottom: 15px;
    color: var(--cp-tip);
  }
  .van-field {
    background-color: var(--cp-bg);
    margin: 15px 0;
    border-radius: 8px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    ::v-deep() {
      .van-checkbox {
        .van-icon {
          font-size: 12px;
        }
        &__label {
          font-size: 12px;
          color: var(--cp-tip);
        }
        height: 16px;
      }
      .van-button {
        padding: 0 16px;
        &.disabled {
          opacity: 1;
          background: #fafafa;
          color: #d9dbde;
          border: #fafafa;
        }
      }
    }
  }
}
</style>
