<script setup lang="ts">
// 需求：
// 1. 实现点击返回按钮，放回上一个页面（历史记录）
// 2. 暴露一个props属性，title 设置标题
// 3. 暴露一个props属性，rightText 设置标题
// 4. 点击右侧的文字按钮，要做的事情是无法确定的。通过事件来通知父组件

import { useRouter } from 'vue-router'

const props = defineProps<{
  title?: string
  rightText?: string
  back?: () => void
}>()

const router = useRouter()
const onClickLeft = () => {
  if (props.back) return props.back()
  // 实现返回
  // 如果有当前网站的上一个历史记录，可以执行back()返回即可
  // 没有记录？跳转首页
  if (history.state?.back) {
    router.back()
  } else {
    router.push('/')
  }
}

const emit = defineEmits<{
  (e: 'click-right'): void
}>()
const onClickRight = () => {
  // 点击右侧的文字按钮，执行的逻辑
  emit('click-right')
}
</script>

<template>
  <van-nav-bar
    left-arrow
    fixed
    @click-left="onClickLeft"
    :title="title"
    :right-text="rightText"
    @click-right="onClickRight"
  ></van-nav-bar>
</template>

<style lang="scss" scoped>
::v-deep() {
  // van-nav-bar__arrow {}
  // van-nav-bar__text {}
  // & 是连接符，连接上一级和下一级选择器，合并一个选择器
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
    }
  }
}
</style>
