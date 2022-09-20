<script setup lang="ts">
import DoctorCard from './DoctorCard.vue'
import { useWindowSize } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import type { DoctorList } from '@/types/consult'
import { getDoctorPage } from '@/services/consult'

// 1. 自己实现，组件初始化计算滚动的宽度，当页面尺寸改变的时候重新计算，组件销毁需要清除事件
// const width = ref(150)
// const setWidth = () => (width.value = (150 / 375) * window.innerWidth)
// onMounted(() => {
//   setWidth()
//   window.addEventListener('resize', setWidth)
// })
// onUnmounted(() => {
//   window.removeEventListener('resize', setWidth)
// })

// 2. 是 vueuse 工具库实现
const { width } = useWindowSize()

// 3. 获取第一页数据即可，current 1  pageSize 5 只需要5条
const list = ref<DoctorList>([])
onMounted(async () => {
  const res = await getDoctorPage({ current: 1, pageSize: 5 })
  list.value = res.data.rows
})
</script>

<template>
  <div class="follow-doctor">
    <div className="head">
      <p>推荐关注</p>
      <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow" /></a>
    </div>
    <div class="body">
      <!-- swipe 组件 -->
      <van-swipe :loop="false" :show-indicators="false" :width="(150 / 375) * width">
        <van-swipe-item v-for="item in list" :key="item.id">
          <doctor-card :item="item"></doctor-card>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;
  .head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
