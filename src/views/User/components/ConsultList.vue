<script setup lang="ts">
import type { ConsultType } from '@/enums'
import ConsultItem from './ConsultItem.vue'

defineProps<{
  type: ConsultType
}>()
</script>

<template>
  <div class="consult-list">
    <consult-item v-for="i in 5" :key="i" />
  </div>
</template>

<style lang="scss" scoped>
.consult-list {
  padding: 10px 15px;
}
</style>
