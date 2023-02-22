<script setup lang="ts">
import { getAllDep } from '@/services/consult'
import { useConsultStore } from '@/stores'
import type { TopDep } from '@/types/consult'
import { ref, onMounted, computed } from 'vue'

const active = ref(0)

const allDep = ref<TopDep[]>([])
onMounted(async () => {
  const res = await getAllDep()
  allDep.value = res.data
})
// 二级科室
const subDep = computed(() => allDep.value[active.value]?.child)

const store = useConsultStore()
</script>

<template>
  <div class="consult-dep-page">
    <cp-nav-bar title="选择科室" />
    <div class="wrapper">
      <van-sidebar v-model="active">
        <van-sidebar-item
          :title="item.name"
          v-for="item in allDep"
          :key="item.id"
        />
      </van-sidebar>
      <div class="sub-dep">
        <router-link
          v-for="sub in subDep"
          :key="sub.id"
          to="/consult/illness"
          @click="store.setDep(sub.id)"
          >{{ sub.name }}</router-link
        >
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
}
</style>
