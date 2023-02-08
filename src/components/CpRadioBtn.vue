<!-- <script setup lang="ts">
// 计数器
// 通过 v-model 解析成 modelValue @update:modelValue
defineProps<{
  modelValue: number
}>()

defineEmits<{ (e: 'update:modelValue', count: number): void }>()
</script>

<template>
  <div class="cp-radio-btn">
    计数器：{{ modelValue }}
    <button @click="$emit('update:modelValue', modelValue + 1)">+1</button>
  </div>
</template>

<style lang="scss" scoped></style> -->

<script setup lang="ts">
// 计数器
// 通过 v-model:count 解析成 count @update:count
defineProps<{
  count: number
}>()

defineEmits<{ (e: 'update:count', count: number): void }>()
</script>

<template>
  <div class="cp-radio-btn">
    计数器：{{ count }}
    <button @click="$emit('update:count', count + 1)">+1</button>
  </div>
</template>

<style lang="scss" scoped></style>
