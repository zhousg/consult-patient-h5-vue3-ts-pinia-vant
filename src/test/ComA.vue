<script setup lang="ts">
defineProps<{
  modelValue: number
  car: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', count: number): void
  (e: 'update:car', car: string): void
}>()
</script>

<template>
  <div class="test-page">
    child组件 {{ modelValue }}
    <button @click="emit('update:modelValue', modelValue + 1)">改count</button>
    <hr />
    {{ car }} <button @click="emit('update:car', '奔驰')">买车</button>
  </div>
</template>

<style lang="scss" scoped></style>
