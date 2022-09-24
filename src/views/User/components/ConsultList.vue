<script setup lang="ts">
import ConsultItem from './ConsultItem.vue'
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
