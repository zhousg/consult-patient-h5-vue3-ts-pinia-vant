<script setup lang="ts">
const onClickLeft = () => {
  // 实现返回
}
const onClickRight = () => {
  // 点击右侧的文字按钮，执行的逻辑
}
</script>

<template>
  <van-nav-bar
    left-arrow
    @click-left="onClickLeft"
    title="标题"
    right-text="按钮"
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
