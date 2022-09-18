<script setup lang="ts">
import { getKnowledgePage } from '@/services/consult'
import type { KnowledgeList, KnowledgeParams, KnowledgeType } from '@/types/consult'
import { ref } from 'vue'
import KnowledgeCard from './KnowledgeCard.vue'

// 需要父组件传入type才知道请求什么类型的文章
const props = defineProps<{
  type: KnowledgeType
}>()

// 实现加载更多效果
const loading = ref(false)
const finished = ref(false)
const list = ref<KnowledgeList>([])
// 查询参数
const params = ref<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 5
})
const onLoad = async () => {
  // 请求数据
  const res = await getKnowledgePage(params.value)
  list.value.push(...res.data.rows)
  loading.value = false
  // 是否加载完成
  if (params.value.current >= res.data.pageTotal) {
    finished.value = true
  } else {
    params.value.current++
  }
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
      <knowledge-card v-for="item in list" :key="item.id" :item="item"></knowledge-card>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
