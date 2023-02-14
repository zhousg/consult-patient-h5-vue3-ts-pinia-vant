<script setup lang="ts">
import KnowledgeCard from './KnowledgeCard.vue'
import { ref } from 'vue'
import type { KnowledgeType } from '@/types/consult'

defineProps<{
  type: KnowledgeType
}>()

// 加载中状态
const loading = ref(false)
// 是否完全加载完毕数据
const finished = ref(false)
// 数据列表
const list = ref<number[]>([])
// 滚动到底部
const onLoad = () => {
  // 模拟加载后台的数据
  const data = [1, 2, 3, 4, 5]
  setTimeout(() => {
    list.value.push(...data)
    // 模拟完全加载完毕数据
    if (list.value.length > 20) {
      finished.value = true
    }
    loading.value = false
  }, 2000)
}
</script>

<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <knowledge-card v-for="(item, i) in list" :key="i"></knowledge-card>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
