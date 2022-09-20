<script setup lang="ts">
import { getAllDep } from '@/services/consult'
import { useConsultStore } from '@/stores/consult'
import type { TopDep } from '@/types/consult'
import { computed, onMounted, ref } from 'vue'

// 当前选择的sidebar-item索引
const active = ref(0)
// 1. 一级科室
const allDep = ref<TopDep[]>([])
onMounted(async () => {
  const res = await getAllDep()
  allDep.value = res.data
})
// 2.  二级科室 依赖  一级科室和当前激活的一级科室索引得到
const subDep = computed(() => allDep.value[active.value]?.child)

// 3. 记录科室ID
const store = useConsultStore()
</script>

<template>
  <div class="consult-dep-page">
    <cp-nav-bar title="选择科室" />
    <div class="wrapper">
      <!-- 侧边栏组件 -->
      <van-sidebar v-model="active">
        <van-sidebar-item v-for="item in allDep" :key="item.id" :title="item.name" />
      </van-sidebar>
      <!-- 二级科室 -->
      <div class="sub-dep">
        <router-link
          @click="store.setDep(sub.id)"
          to="/consult/illness"
          v-for="sub in subDep"
          :key="sub.id"
        >
          {{ sub.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.van-sidebar {
  width: 114px;
  &-item {
    padding: 14px;
    color: var(--cp-tag);
    &--select {
      color: var(--cp-main);
      font-weight: normal;
      &::before {
        display: none;
      }
    }
  }
}
.consult-dep-page {
  padding-top: 46px;
}
.wrapper {
  height: calc(100vh - 46px);
  overflow: hidden;
  display: flex;
  .sub-dep {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    > a {
      display: block;
      padding: 14px 30px;
      color: var(--cp-dark);
    }
  }
}
</style>
