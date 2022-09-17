<script setup lang="ts">
// 提供一个props属性，确定使用哪个图标，使用的规则：文件夹名称+图片名称
defineProps<{
  name: string
}>()
</script>

<template>
  <svg aria-hidden="true" class="cp-icon">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<style lang="scss" scoped>
.cp-icon {
  // 通过 font-size 控制图片的大小
  width: 1em;
  height: 1em;
}
</style>
