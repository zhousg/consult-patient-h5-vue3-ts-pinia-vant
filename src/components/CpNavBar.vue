<script setup lang="ts">
// 1. 通过props来实现标题和右侧文字的设置
defineProps<{
  title?: string
  rightText?: string
}>()
const emit = defineEmits<{
  (e: 'click-right'): void
}>()
// 2. 使用emit函数来触发自定义事件（点击右侧文字按钮）
const onClickRight = () => {
  emit('click-right')
}
</script>

<template>
  <!-- 固定定位，左侧箭头，标题，右侧文字 -->
  <van-nav-bar
    fixed
    left-arrow
    :title="title"
    :right-text="rightText"
    @click-right="onClickRight"
  ></van-nav-bar>
</template>

<style lang="scss" scoped>
:deep() {
  .van-nav-bar {
    &__arrow {
      color: var(--cp-text1);
      font-size: 18px;
    }
    &__title {
      font-size: 15px;
    }
  }
}
</style>
